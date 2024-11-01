import "./HomeProfile.css";

import { FadeInComponent } from "components/FadeInComponent";

export const HomeProfile = () => {
  return (
    <section>
      <div className="c-homeProfile">
        <div className="c-homeProfile-card">
          <div className="c-homeProfile-card-block">
            <FadeInComponent>
              <figure>
                <div className="c-homeProfile-card-image">
                  <p>
                    <img src="profile-img1.jpg" alt="" />
                  </p>
                  <h2 className="c-homeProfile-card-title">PROFILE</h2>
                </div>
                <figcaption>
                  <p className="c-homeProfile-card-nameJp">O.S</p>
                  <p className="c-homeProfile-card-nameEn">Shigeyuki Okada</p>
                  <p className="c-homeProfile-card-nameText">
                    デザインも可能ですが、最近ではコーディングが面白く、毎日のようにReact.js、Next.js、Node.js、Supabaseを活用したサイト制作を中心に行っております。
                    <br />
                    <br />
                    年齢を問題にする方もいらっしゃいますが、私は年齢は関係ないと考えています。この業界は絶えず学び、新しい挑戦が求められます。それを否定すれば、この業界で生き抜くのは難しいと感じています。また、辛く学ぶよりも楽しみながら学ぶほうが成長すると考えており、私自身も常に楽しみながら学んでいます。
                    <br />
                    <br />
                    このポートフォリオサイトは、MongoDB、Express、React.js、Node.jsを使用し、画像はAmazon
                    S3、EメールサービスはAmazon
                    SESで構築しています。デプロイはVercelを利用しています。
                  </p>
                </figcaption>
              </figure>
            </FadeInComponent>
          </div>
          <div className="c-homeProfile-card-block">
            <FadeInComponent>
              <figure>
                <div className="c-homeProfile-card-image">
                  <p>
                    <img src="profile-img2.jpg" alt="" />
                  </p>
                  <h2 className="c-homeProfile-card-title">SKILL</h2>
                </div>
                <figcaption>
                  <dl className="c-homeProfile-card-block-def">
                    <dt>言語</dt>
                    <dd>
                      HTML5:10年以上 / CSS3:10年以上 / SCSS:7年 / Javascript:7年
                      / MySQL:5年 / React.js:1年6ヶ月 / Node.js:1年6ヶ月 /
                      TypeScript:1年6ヶ月
                    </dd>
                  </dl>
                  <dl className="c-homeProfile-card-block-def">
                    <dt>CMS</dt>
                    <dd>Wordpress:7年</dd>
                  </dl>
                  <dl className="c-homeProfile-card-block-def">
                    <dt>フレームワーク</dt>
                    <dd>Next.js:1年6ヶ月</dd>
                  </dl>
                  <dl className="c-homeProfile-card-block-def">
                    <dt>デザインツール</dt>
                    <dd>
                      Photoshop:10年以上 / Illustrator:10年以上 / AdobeXD:5年
                    </dd>
                  </dl>
                  <dl className="c-homeProfile-card-block-def">
                    <dt>その他</dt>
                    <dd>
                      Git:5年 / Gulp:5年 / Supabase:1年6ヶ月 / 上級ウェブ解析士
                    </dd>
                  </dl>
                </figcaption>
              </figure>
            </FadeInComponent>
          </div>
        </div>
      </div>
    </section>
  );
};
