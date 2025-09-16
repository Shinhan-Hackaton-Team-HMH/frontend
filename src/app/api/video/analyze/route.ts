// // app/api/video/analyze/route.ts

// import { NextResponse } from 'next/server';
// import {
//   VideoIntelligenceServiceClient,
//   protos,
// } from '@google-cloud/video-intelligence';
// import { groupSimilarTexts } from '@/app/utils/levenshtein';

// const client = new VideoIntelligenceServiceClient();

// const likelihoods = [
//   'UNKNOWN',
//   'VERY_UNLIKELY',
//   'UNLIKELY',
//   'POSSIBLE',
//   'LIKELY',
//   'VERY_LIKELY',
// ];

// export async function POST(req: Request) {
//   try {
//     const { gcsUri } = await req.json();
//     if (!gcsUri || typeof gcsUri !== 'string') {
//       return NextResponse.json(
//         { error: 'gcsUri is required' },
//         { status: 400 },
//       );
//     }

//     const request: protos.google.cloud.videointelligence.v1.IAnnotateVideoRequest =
//       {
//         inputUri: gcsUri,
//         features: [
//           protos.google.cloud.videointelligence.v1.Feature
//             .EXPLICIT_CONTENT_DETECTION,
//           protos.google.cloud.videointelligence.v1.Feature.LABEL_DETECTION,
//           protos.google.cloud.videointelligence.v1.Feature.TEXT_DETECTION,
//         ],
//       };

//     // Execute the request
//     const [operation] = await client.annotateVideo(request);

//     console.log('Waiting for video analysis to complete...');

//     const [operationResult] = await operation.promise();

//     const explicitContentResults =
//       operationResult.annotationResults?.[0]?.explicitAnnotation;

//     const labelContentAnnotation =
//       operationResult.annotationResults?.[0].segmentLabelAnnotations;

//     const textContentAnnotation =
//       operationResult.annotationResults?.[0].textAnnotations;
//     const labelContentResult = labelContentAnnotation?.map((label) => {
//       console.log(`Label ${label?.entity?.description} occurs at:`);
//       if (label && label.segments) {
//         return {
//           label: label?.entity?.description,
//           time: label.segments.map((segment) => {
//             const time =
//               segment.segment as protos.google.cloud.videointelligence.v1.IVideoSegment;
//             const startTime = time.startTimeOffset;
//             const endTime = time.endTimeOffset;
//             if (startTime && endTime) {
//               if (startTime.seconds === undefined) {
//                 startTime.seconds = 0;
//               }
//               if (startTime.nanos === undefined) {
//                 startTime.nanos = 0;
//               }
//               if (endTime.seconds === undefined) {
//                 endTime.seconds = 0;
//               }
//               if (endTime.nanos === undefined) {
//                 endTime.nanos = 0;
//               }
//               return {
//                 start:
//                   `\tStart: ${startTime.seconds}` +
//                   `.${(startTime.nanos || 0 / 1e6).toFixed(0)}s`,
//                 end:
//                   `\tEnd: ${endTime.seconds}.` +
//                   `${(endTime.nanos || 0 / 1e6).toFixed(0)}s`,
//                 confidence: `\tConfidence: ${segment.confidence}`,
//               };
//             }
//           }),
//         };
//       }
//     });

//     const textContentResult = textContentAnnotation?.map((textAnnotation) => {
//       if (textAnnotation && textAnnotation.segments) {
//         return {
//           text: textAnnotation.text,
//           segment: textAnnotation.segments.forEach((segment) => {
//             const time =
//               segment.segment as protos.google.cloud.videointelligence.v1.IVideoSegment;
//             const startTime = time.startTimeOffset;
//             const endTime = time.startTimeOffset;
//             if (startTime && endTime) {
//               if (startTime.seconds === undefined) {
//                 startTime.seconds = 0;
//               }
//               if (startTime.nanos === undefined) {
//                 startTime.nanos = 0;
//               }
//               if (endTime.seconds === undefined) {
//                 endTime.seconds = 0;
//               }
//               if (endTime.nanos === undefined) {
//                 endTime.nanos = 0;
//               }
//               return {
//                 start:
//                   `\tStart: ${startTime.seconds}` +
//                   `.${(startTime.nanos || 0 / 1e6).toFixed(0)}s`,
//                 end:
//                   `\tEnd: ${endTime.seconds}.` +
//                   `${(endTime.nanos || 0 / 1e6).toFixed(0)}s`,
//                 confidence: `\tConfidence: ${segment.confidence}`,
//               };
//             }
//             // if (segment && segment.frames) {
//             //   console.log(` Confidence: ${segment.confidence}`);
//             //   segment.frames.forEach((frame) => {
//             //     const timeOffset = frame.timeOffset;
//             //     if (timeOffset) {
//             //       console.log(
//             //         `Time offset for the frame: ${timeOffset.seconds || 0}` +
//             //           `.${(timeOffset.nanos || 0 / 1e6).toFixed(0)}s`,
//             //       );
//             //     }
//             //     console.log('Rotated Bounding Box Vertices:');
//             //     frame.rotatedBoundingBox.vertices.forEach((vertex) => {
//             //       console.log(`Vertex.x:${vertex.x}, Vertex.y:${vertex.y}`);
//             //     });
//             //   });
//             // }
//           }),
//         };
//       }
//     });

//     if (!explicitContentResults || !explicitContentResults.frames) {
//       return NextResponse.json({
//         message: 'No explicit content detected or no frames available',
//       });
//     }

//     const explicitResults = explicitContentResults.frames.map((frame) => {
//       const seconds = frame.timeOffset?.seconds ?? 0;
//       const nanos = frame.timeOffset?.nanos ?? 0;

//       const likelihood =
//         typeof frame.pornographyLikelihood === 'number'
//           ? likelihoods[frame.pornographyLikelihood]
//           : 'UNKNOWN';

//       return {
//         time: `${seconds}.${(nanos / 1e6).toFixed(0)}s`,
//         pornographyLikelihood: likelihood,
//       };
//     });
//     const textFlat =
//       textContentResult?.flatMap((value) => value?.text || '') || [];
//     const textSimilarity = groupSimilarTexts(textFlat, 0.6);

//     return NextResponse.json({
//       explicit: explicitResults,
//       label: labelContentResult,
//       text: textSimilarity,
//     });
//   } catch (error) {
//     console.error('Error analyzing video:', error);
//     return NextResponse.json(
//       { error: 'Failed to analyze video' },
//       { status: 500 },
//     );
//   }
// }
