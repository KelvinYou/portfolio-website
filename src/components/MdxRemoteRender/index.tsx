import { DynamicNoSSR } from '@/components/PdfRenderer/utils';

const MdxRemoteRender = DynamicNoSSR(() => import('./MdxRemoteRender'));

export default MdxRemoteRender;