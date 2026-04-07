import 'server-only';
import { UniversitasAPI } from 'sdk-global-universitas';

declare global {
    var universitasGlobal: UniversitasAPI | undefined;
}

export const universitas =
    globalThis.universitasGlobal || new UniversitasAPI(process.env.UNIVERSITAS_SDK_URL as string);

if (process.env.NODE_ENV !== 'production') {
    globalThis.universitasGlobal = universitas;
}
