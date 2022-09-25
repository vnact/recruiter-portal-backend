import * as bcrypt from 'bcrypt';
export class UtilService {
  /**
   * generate hash from password or string
   * @param {string} password
   * @returns {string}
   */
  static generateHash(password: string): string;
  static generateHash(password: string, salt?: string): string {
    if (salt) {
      return bcrypt.hashSync(password, salt);
    }
    return bcrypt.hashSync(password, 10);
  }

  /**
   * validate text with hash
   * @param {string} password
   * @param {string} hash
   * @returns {Promise<boolean>}
   */
  static validateHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash || '');
  }

  static nomalizeSortType(sortType?: string): 'ASC' | 'DESC' {
    if (sortType && ['ASC', 'DESC', 'asc', 'desc'].includes(sortType)) {
      return sortType.toUpperCase() as 'ASC' | 'DESC';
    }

    return 'ASC';
  }

  /**
   *
   * @param enm enum variable
   * @param value string
   * @returns Enum
   */
  static enumFromStringValue<T>(
    enm: { [s: string]: T },
    value: string,
  ): T | undefined {
    return (Object.values(enm) as unknown as string[]).includes(value)
      ? (value as unknown as T)
      : undefined;
  }
}
