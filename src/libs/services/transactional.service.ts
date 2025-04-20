import { Injectable, Logger } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class TransactionalService {
  constructor(private dataSource: DataSource) {}
  private readonly logger = new Logger(TransactionalService.name);
  async executeInTransaction<T>(
    work: (manager: EntityManager) => Promise<T>,
    existingEntityManager?: EntityManager,
  ): Promise<T> {
    // Check if an existing EntityManager has been provided
    if (existingEntityManager) {
      // If so, use it directly to perform the work
      try {
        return await work(existingEntityManager);
      } catch (error) {
        this.logger.error('executeInTransaction existed manager error', error);
        throw error; // Rethrow the error (rollback should be handled where the transaction was originally started)
      }
    } else {
      // No existing EntityManager provided, create a new transaction
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        const result = await work(queryRunner.manager);
        await queryRunner.commitTransaction();
        return result;
      } catch (error) {
        await queryRunner.rollbackTransaction();
        this.logger.error('executeInTransaction error', error);
        throw error;
      } finally {
        await queryRunner.release();
      }
    }
  }
}
