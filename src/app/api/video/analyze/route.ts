// app/api/video/analyze/route.ts

import { NextResponse } from 'next/server';
import {
  VideoIntelligenceServiceClient,
  protos,
} from '@google-cloud/video-intelligence';

const client = new VideoIntelligenceServiceClient();

const likelihoods = [
  'UNKNOWN',
  'VERY_UNLIKELY',
  'UNLIKELY',
  'POSSIBLE',
  'LIKELY',
  'VERY_LIKELY',
];

export async function POST(req: Request) {
  try {
    const { gcsUri } = await req.json();
    console.log('gcsURI ', gcsUri);

    if (!gcsUri || typeof gcsUri !== 'string') {
      return NextResponse.json(
        { error: 'gcsUri is required' },
        { status: 400 },
      );
    }

    const request: protos.google.cloud.videointelligence.v1.IAnnotateVideoRequest =
      {
        inputUri: gcsUri,
        features: [
          protos.google.cloud.videointelligence.v1.Feature
            .EXPLICIT_CONTENT_DETECTION,
        ],
      };

    // Execute the request
    const [operation] = await client.annotateVideo(request);

    console.log('Waiting for video analysis to complete...');

    const [operationResult] = await operation.promise();

    const explicitContentResults =
      operationResult.annotationResults?.[0]?.explicitAnnotation;

    if (!explicitContentResults || !explicitContentResults.frames) {
      return NextResponse.json({
        message: 'No explicit content detected or no frames available',
      });
    }

    const results = explicitContentResults.frames.map((frame) => {
      // Use nullish coalescing (??) to provide default values for timeOffset fields
      const seconds = frame.timeOffset?.seconds ?? 0;
      const nanos = frame.timeOffset?.nanos ?? 0;

      const likelihood =
        typeof frame.pornographyLikelihood === 'number'
          ? likelihoods[frame.pornographyLikelihood]
          : 'UNKNOWN';

      return {
        time: `${seconds}.${(nanos / 1e6).toFixed(0)}s`,
        pornographyLikelihood: likelihood,
      };
    });
    return NextResponse.json({ results });
  } catch (error) {
    console.error('Error analyzing video:', error);
    return NextResponse.json(
      { error: 'Failed to analyze video' },
      { status: 500 },
    );
  }
}
