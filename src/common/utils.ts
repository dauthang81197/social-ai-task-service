import 'dotenv/config';
import * as bcrypt from 'bcrypt';

export const comparePassword = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash);
};

export const checkPermissionExits = (request: any, permissionCode: string) => {
  return (
    request?.user?.permissions &&
    request?.user?.permissions.length > 0 &&
    request?.user?.permissions
      .map((item) => item.code)
      .includes(`${process.env.PRODUCT_CODE}::${permissionCode}`) >= 0
  );
};

export const randomString = (len: number, charSet?: string) => {
  charSet =
    charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < len; i++) {
    const randomPoz = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomPoz, randomPoz + 1);
  }
  return randomString;
};

export const convertStringToIntArr = (rawString: string, comma: string) => {
  const stringArr = rawString.split(comma);
  return stringArr.map((item) => parseInt(item));
};

export const generateRandomPassword = (length: number) => {
  const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const specialCharacters = '!@#$%^&*()-_+=<>?';

  // Include one random special character
  const randomSpecialChar = specialCharacters.charAt(
    Math.floor(Math.random() * specialCharacters.length),
  );

  // Use the rest of the characters for the password
  const remainingCharacters =
    uppercaseLetters +
    lowercaseLetters +
    numbers +
    specialCharacters.replace(randomSpecialChar, '');

  let password = randomSpecialChar;

  for (let i = 1; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * remainingCharacters.length);
    password += remainingCharacters[randomIndex];
  }

  return password;
};

export const getLastDayOfMonthReSub = (date?: Date) => {
  const currentDate = date || new Date();
  currentDate.setMonth(currentDate.getMonth() + 1);
  if (date?.getDate()) {
    currentDate.setDate(date?.getDate());
  }

  return currentDate;
};

export const getLastDayOfMonthOfYearReSub = (date?: Date) => {
  const currentDate = date || new Date();
  currentDate.setFullYear(currentDate.getFullYear() + 1);
  if (date?.getDate()) {
    currentDate.setDate(date?.getDate());
  }
  return currentDate;
};

export const addDaysFromNow = (days: number) => {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + days);
  return futureDate;
};

export const addDays = (date: Date, days: number) => {
  date.setDate(date.getDate() + days);
  return date;
};

export const getDaysBetweenDates = (startDate: Date, endDate: Date) => {
  const difference = endDate.getTime() - startDate.getTime();
  const days = difference / (1000 * 3600 * 24);
  return Math.abs(days);
};

export function convertEnumToName<T extends object, U extends object>(
  enumNumber: number,
  fromEnum: T,
  toEnum: U,
): U[keyof U] | null {
  // Find the enum name by its value
  const enumName = (Object.keys(fromEnum) as Array<keyof T>).find(
    (key) => fromEnum[key] === enumNumber,
  );
  // Return the corresponding value from the toEnum using the found name
  if (enumName && enumName in toEnum) {
    return toEnum[enumName as unknown as keyof U];
  } else {
    return null; // or throw an error if preferred
  }
}

export const replaceAll = (str: string, find: string, replace: string) => {
  if (str) {
    return str.replace(new RegExp(find, 'g'), replace);
  }
  return '';
};

export const replaceStringDownTheLine = (str: string) => {
  return replaceAll(str, '\n', '<br/>');
};

export const calculateAge = (birthday: Date) => {
  const currentDate = new Date();
  const birthDate = new Date(birthday);

  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = currentDate.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

export const findCommonElements = (arrays: string[][]): string[] => {
  if (arrays.length === 0) return [];

  const sampleList = arrays[0];

  return sampleList.filter((element) =>
    arrays?.every((array) => array?.includes(element)),
  );
};
