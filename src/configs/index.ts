import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const PERSONNEL_MAX_RECORDS_PER_FILE = configService.get<number>(
  'PERSONNEL_MAX_RECORDS_PER_FILE',
);

export const SCHEDULES_MAX_RECORDS_PER_FILE = configService.get<number>(
  'SCHEDULES_MAX_RECORDS_PER_FILE',
);

export const WORK_ORDER_MAX_RECORDS_PER_FILE = configService.get<number>(
  'WORK_ORDER_MAX_RECORDS_PER_FILE',
);

export const WORK_PERMIT_MAX_RECORDS_PER_FILE = configService.get<number>(
  'WORK_PERMIT_MAX_RECORDS_PER_FILE',
);

export const ORGANIZATION_MEMBER_MAX_RECORDS_PER_FILE =
  configService.get<number>('ORGANIZATION_MEMBER_MAX_RECORDS_PER_FILE');

export const ADMIN_STAFF_MAX_RECORDS_PER_FILE = configService.get<number>(
  'ADMIN_STAFF_MAX_RECORDS_PER_FILE',
);

export const SKILL_COMPETENCIES_MAX_RECORDS_PER_FILE =
  configService.get<number>('SKILL_COMPETENCIES_MAX_RECORDS_PER_FILE');
