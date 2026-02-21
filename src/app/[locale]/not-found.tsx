// 전역 404 페이지 — 존재하지 않는 경로 접근 시 표시
import { FileQuestion } from "lucide-react";
import { Link } from "@/application/i18n/routing";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <FileQuestion className="w-16 h-16 text-gray-300 mb-6" />
      <h2 className="text-xl font-bold text-foreground mb-2">
        페이지를 찾을 수 없습니다
      </h2>
      <p className="text-sm text-subtext mb-8 max-w-xs">
        요청하신 페이지가 존재하지 않거나 이동되었습니다.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-medium rounded-full hover:bg-primary-dark transition-colors"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
