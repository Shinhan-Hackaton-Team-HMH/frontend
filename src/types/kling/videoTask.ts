export interface TaskRquestBody {
  modelname: string;
  image_list: string[];
  prompt: string;
  negative_prompt: string;
  mode: string;
  duration: string;
  aspect_ratio: string;
  callback_url: string;
}

interface Video {
  id: string;
  url: string;
  duration: string;
}

interface TaskResult {
  videos: Video[];
}

interface TaskInfo {
  external_task_id: string;
}

interface Data {
  task_id: string;
  task_status: 'submitted' | 'processing' | 'succeed' | 'failed';
  task_status_msg: string;
  task_info: TaskInfo;
  created_at: number;
  updated_at: number;
  task_result: TaskResult;
}

export interface VideoResponse {
  code: number;
  message: string;
  request_id: string;
  data: Data;
}
