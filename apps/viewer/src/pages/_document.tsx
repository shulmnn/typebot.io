/* eslint-disable @next/next/no-sync-scripts */
import {
  DocumentHeadTags,
  type DocumentHeadTagsProps,
} from "@mui/material-nextjs/V14-pagesRouter";
import {
  type DocumentProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

const Document = (props: DocumentProps & DocumentHeadTagsProps) => (
  <Html translate="no">
    <Head>
      <DocumentHeadTags {...props} />
      <script src="/__ENV.js" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
