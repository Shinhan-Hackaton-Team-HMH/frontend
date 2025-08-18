export default function Footer() {
  return (
    <div className="flex flex-row w-full justify-start">
      <div className="flex flex-col">
        <div>Kt 바로광고</div>
        <div className="flex flex-row gap-3">
          <div className="flex flex-col gap-3">
            <span>대표 번호</span>
            <span>이메일</span>
            <span>주소</span>
          </div>
          <div className="flex flex-col gap-3">
            <span>1544-6979</span>
            <span>help.ktbrad@platbread.com</span>
            <span>
              경기도 성남시 분당구 불정로 90 KT 본사<span>13606</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
