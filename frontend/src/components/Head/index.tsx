import { Helmet } from "react-helmet-async";

type props = {
  title: string | null;
  description: string | null;
};

export const Head = (props: props) => {
  const title = `${
    props.title ? props.title + " | " : ""
  }岡田茂之ポートフォリオサイト【os-create】`;
  const desc = `${
    props.description ? props.description + "ページ。" : ""
  }私の名前は岡田茂之です。デザインとコーディングの双方を得意とするエンジニアです。最近ではJavaScriptを用いた開発に特に興味を持ち、日々ReactやNode.js、Firebaseを活用したサイト制作を楽しんでいます。年齢ではなく経験と知識を重視する私は、新たな技術を学び、挑戦することを恐れません。ここでは私のスキルを生かして作成したポートフォリオサイトをご覧いただけます。MongoDB、Express、React.js、Node.jsを組み合わせたMERNスタックを用いて構築し、Amazon S3とAmazon SESを活用。最終的にはVercelにデプロイしました。是非ご覧ください。"`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={desc} />
    </Helmet>
  );
};
