import { ViduSetting, ViduTemplate } from '@/types/vidu/type';
import axios from 'axios';

export async function POST(request: Request) {
  const videoSetting: ViduSetting = {
    template: ViduTemplate.ORBIT_DOLLY,
    images: [],
    prompt: '',
    aspect_ratio: '9:16',
    bgm: false,
    payload: '',
    callback_url: '', // spring server
  };

  const res = axios.post('https://api.vidu.com/ent/v2/template2video');
  return Response.json({ videoSetting });
}
