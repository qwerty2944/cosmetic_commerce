// API 클라이언트 빌더 패턴 클래스
// axios 인스턴스를 감싸서 체이닝 방식으로 설정할 수 있도록 제공
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

// 요청 인터셉터 핸들러 타입
type RequestFulfilled = (
  config: InternalAxiosRequestConfig
) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
type RequestRejected = (error: unknown) => unknown;

// 응답 인터셉터 핸들러 타입
type ResponseFulfilled = (
  response: AxiosResponse
) => AxiosResponse | Promise<AxiosResponse>;
type ResponseRejected = (error: unknown) => unknown;

export class ApiClient {
  private instance: AxiosInstance;

  // 외부에서 직접 생성 불가 — create()로만 생성
  private constructor() {
    this.instance = axios.create();
  }

  // 빌더 진입점
  static create(): ApiClient {
    return new ApiClient();
  }

  // 기본 URL 설정
  setBaseURL(url: string): this {
    this.instance.defaults.baseURL = url;
    return this;
  }

  // 요청 타임아웃 설정 (밀리초)
  setTimeout(ms: number): this {
    this.instance.defaults.timeout = ms;
    return this;
  }

  // 기본 헤더 설정
  setHeaders(headers: Record<string, string>): this {
    Object.assign(this.instance.defaults.headers.common, headers);
    return this;
  }

  // 쿠키 포함 여부 설정 (CORS 요청 시 필요)
  setWithCredentials(v: boolean): this {
    this.instance.defaults.withCredentials = v;
    return this;
  }

  // 요청 인터셉터 추가 — 요청 전 가공/인증 토큰 주입 등
  addRequestInterceptor(
    onFulfilled: RequestFulfilled,
    onRejected?: RequestRejected
  ): this {
    this.instance.interceptors.request.use(onFulfilled, onRejected);
    return this;
  }

  // 응답 인터셉터 추가 — 에러 핸들링, 토큰 갱신 등
  addResponseInterceptor(
    onFulfilled: ResponseFulfilled,
    onRejected?: ResponseRejected
  ): this {
    this.instance.interceptors.response.use(onFulfilled, onRejected);
    return this;
  }

  // 빌드 완료 — 이후 HTTP 메서드 사용 가능
  build(): this {
    return this;
  }

  // --- HTTP 메서드 (기존 api.get/post 시그니처와 동일) ---

  get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.get<T>(url, config);
  }

  post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.post<T>(url, data, config);
  }

  put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.put<T>(url, data, config);
  }

  patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.patch<T>(url, data, config);
  }

  delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.delete<T>(url, config);
  }
}
