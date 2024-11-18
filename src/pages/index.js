import { useLayoutEffect, useRef } from 'react';
import videojs from 'video.js';

import Card from 'components/Card';
import Layout from 'components/Layout';
import ThemeProvider from 'components/ThemeProvider';

export default function IndexPage() {
  const videoRef = useRef();

  useLayoutEffect(() => {
    if (!videoRef.current) {
      return;
    }

    videojs(videoRef.current);
  }, [videoRef]);

  return (
    <ThemeProvider>
      <Layout title="Live Stream">
        <Card>
          <video
            className="video-js"
            controls
            data-setup={'{"fluid": true}'}
            height={720}
            muted
            poster="/images/poster.jpg"
            preload="auto"
            ref={videoRef}
          >
            <source
              src={WEBPACK_HLS_STREAM_URL}
              type="application/x-mpegURL"
            ></source>
            <p>
              To view this video please enable JavaScript, and consider
              upgrading to a web browser that
              <a
                href="https://videojs.com/html5-video-support/"
                rel="noopener noreferrer"
                target="_blank"
              >
                supports HTML5 video
              </a>
            </p>
          </video>
        </Card>
      </Layout>
    </ThemeProvider>
  );
}
