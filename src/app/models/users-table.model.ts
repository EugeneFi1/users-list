export const DISPLAYED_COLUMNS = [
  'name',
  'username',
  'email',
  'website',
  'operations',
];

export interface ConfirmationDialogTriggerModel {
  text?: string;
  confirmFn: (isConfirmed: boolean) => void;
}
