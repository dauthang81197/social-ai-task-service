import { newDb, DataType } from 'pg-mem';
import { DataSource } from 'typeorm';
import { v4 } from 'uuid';

import { connectionOptions } from '../src/database/ormconfig';

/**
 * This function sets up an in-memory postgres database using `pg-mem` and returns a `DataSource` object.
 * @returns ${@link DataSource}
 */
export const setupLocalDataSource = async () => {
  const db = newDb({
    autoCreateForeignKeyIndices: true,
  });

  db.public.registerFunction({
    name: 'current_database',
    args: [],
    returns: DataType.text,
    implementation: (x) => `hello world ${x}`,
  });

  db.public.registerFunction({
    implementation: () => 'test',
    name: 'current_database',
  });

  db.registerExtension('uuid-ossp', (schema) => {
    schema.registerFunction({
      name: 'uuid_generate_v4',
      returns: DataType.uuid,
      implementation: v4,
      impure: true,
    });
  });

  db.public.registerFunction({
    name: 'version',
    args: [],
    returns: DataType.text,
    implementation: () =>
      'PostgreSQL 14.2, compiled by Visual C++ build 1914, 64-bit',
  });
  const ds: DataSource = await db.adapters.createTypeormDataSource(
    connectionOptions,
  );
  await ds.initialize();
  await ds.synchronize();

  return ds;
};
