export enum StatusEnum {
  IN_ACTIVE = 0,
  ACTIVE = 1,
  UNDER_REVIEW = 2,
  REJECT = 3,
  CANCEL = 4,
}

export enum WorkOrderStatusEnum {
  TODO = 1,
  IN_PROGRESS = 2,
  COMPLETED = 3,
}

export enum CampaignPlanStatusEnum {
  TODO = 1,
  IN_PROGRESS = 2,
  COMPLETED = 3,
}

export enum OperationStatusEnum {
  TODO = 1,
  IN_PROGRESS = 2,
  COMPLETED = 3,
}

export enum CampaignPlanStringStatusEnum {
  ALL = 'All',
  TODO = 'TODO', // 1
  IN_PROGRESS = 'IN_PROGRESS', // 2
  COMPLETED = 'COMPLETED', // 3
}

export enum OperationStringStatusEnum {
  ALL = 'All',
  TODO = 'TODO', // 1
  IN_PROGRESS = 'IN_PROGRESS', // 2
  COMPLETED = 'COMPLETED', // 3
}

export enum StatusStringEnum {
  IN_ACTIVE = 'IN_ACTIVE', // 0
  ACTIVE = 'ACTIVE', // 1
  UNDER_REVIEW = 'UNDER_REVIEW', // 2
  REJECT = 'REJECT', // 3
}

export enum CompetencyTypeEnum {
  ALL = 'All',
  QUALIFICATION = 'Qualification',
  LICENSE = 'License',
  TICKET = 'Ticket',
}

export enum SkillStatusEnum {
  ACTIVE = 'Active',
  EXPIRED = 'Expired',
}

export enum StatusTextEnum {
  IN_ACTIVE = 'Inactive',
  ACTIVE = 'Active',
}

export enum StatusRequestReviewStringEnum {
  IN_ACTIVE = 'IN_ACTIVE', // 0
  ACTIVE = 'APPROVED', // 1
  UNDER_REVIEW = 'PROCESSING', // 2
  REJECT = 'REJECTED', // 3
}

export enum StatusOrgStringEnum {
  IN_ACTIVE = 'IN_ACTIVE', // 0
  ACTIVE = 'ACTIVE', // 1
}

export enum StatusAdminStaffStringEnum {
  IN_ACTIVE = 'IN_ACTIVE', // 0
  ACTIVE = 'ACTIVE', // 1
}

export enum AnnouncementStatusEnum {
  ACTIVE = 1,
  EXPIRED = 2,
  SCHEDULED = 3,
}

export enum AnnouncementStatusCodeEnum {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  SCHEDULED = 'SCHEDULED',
}

export enum AnnouncementStatusTextEnum {
  ACTIVE = 'Active',
  EXPIRED = 'Expired',
  SCHEDULED = 'Scheduled',
}

export enum NotificationStatusEnum {
  SENT = 1,
  SCHEDULED = 2,
}

export enum NotificationStatusCodeEnum {
  SENT = 'SENT',
  SCHEDULED = 'SCHEDULED',
}

export enum NotificationStatusTextEnum {
  SENT = 'Sent',
  SCHEDULED = 'Scheduled',
}

export function getAnnouncementStatusText(
  status: number,
): AnnouncementStatusTextEnum {
  switch (status) {
    case AnnouncementStatusEnum.ACTIVE:
      return AnnouncementStatusTextEnum.ACTIVE;
    case AnnouncementStatusEnum.SCHEDULED:
      return AnnouncementStatusTextEnum.SCHEDULED;
    default:
      return AnnouncementStatusTextEnum.EXPIRED;
  }
}

export function getNotificationStatusText(
  status: number,
): NotificationStatusTextEnum {
  if (status === NotificationStatusEnum.SENT) {
    return NotificationStatusTextEnum.SENT;
  } else {
    return NotificationStatusTextEnum.SCHEDULED;
  }
}
