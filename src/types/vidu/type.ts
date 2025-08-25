export interface ViduSetting {
  template: ViduTemplate;
  images: string[];
  prompt: string;
  aspect_ratio: '9:16';
  bgm: false;
  payload: string;

  callback_url: string;
}

export interface ViduResponse extends ViduSetting {
  credits: string;
  created_at: string;
}

export const enum ViduTemplate {
  //https://platform.vidu.com/docs/templates
  ORBIT_DOLLY = 'orbit_dolly',
  ORBIT = 'orbit',
  ORBIT_DOLLY_FAST = 'orbit_dolly_fast',
  ZOOM_IN = 'zoom_in',
  ZOOM_OUT = 'zoom_out_image',
}
