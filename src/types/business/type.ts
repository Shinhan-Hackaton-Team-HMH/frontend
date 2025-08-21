export interface BusinessRegistration {
  /**
   * 고유한 사업자 ID (숫자 타입).
   */
  biz_id: number;
  /**
   * 사업자 등록 번호 (문자열 타입).
   * 예: "368-88-03013"
   */
  biz_number: string;
  /**
   * 사업자 또는 회사 이름 (문자열 타입).
   * 예: "(주)글로벌데이터로드"
   */
  biz_name: string;
  /**
   * 대표자 이름 (문자열 타입).
   * 예: "이상옥"
   */
  owner_name: string;
  /**
   * 사업장 주소 (문자열 타입).
   * 예: "서울특별시 송파구 오금로46길 41, 2층 2404호(가락동)"
   */
  address: string;
  /**
   * 사업자 업종 (문자열 타입).
   * 예: "정보통신업"
   */
  biz_type: string;
  /**
   * 사업자 세부 업종 (문자열 타입).
   * 예: "응용 소프트웨어 개발 및 공급업"
   */
  biz_subtype: string;
}
