
import { FadeInComponent } from "components/FadeInComponent"
import "./HomeProfile.css"

export const HomeProfile = () => {
  return (
    <section>
      <div className="c-homeProfile">
        <div className="c-homeProfile-card">
            <div className="c-homeProfile-card-block">
              <FadeInComponent>
                <figure>
                    <div className="c-homeProfile-card-image">
                        <p><img src="profile-img1.jpg" alt="" /></p>
                        <h2 className="c-homeProfile-card-title">PROFILE</h2>
                    </div>
                    <figcaption>
                        <p className="c-homeProfile-card-nameJp">岡田 茂之</p>
                        <p className="c-homeProfile-card-nameEn">Shigeyuki Okada</p>
                        <p className="c-homeProfile-card-nameText">デザインも可能ですが、最近ではコーディング（Javascript）が面白く、毎日のようにReactやNode.js、Firebaseを活用したサイト制作が趣味になっています。<br />
                        <br />
                        年齢を問題にする方もいらっしゃいますが、私は年齢は関係ないと考えています。この業界は絶えず学び、新しい挑戦が求められます。それを否定すれば、この業界で生き抜くことは難しいと私は感じています。そして、辛く感じながら学ぶよりも、楽しみながら学んだ方が成長すると思います。そのため、私はいつも楽しみながら学んでいます。<br />
                        <br />
                        このポートフォリオサイトはMongoDB・Express・React.js・Node.js、画像はAmazon S3、EメールサービスはAmazon SESで構築し、Vercelにデプロイしています。</p>
                    </figcaption>
                </figure>
              </FadeInComponent>
            </div>
            <div className="c-homeProfile-card-block">
              <FadeInComponent>
                <figure>
                    <div className="c-homeProfile-card-image">
                        <p><img src="profile-img2.jpg" alt="" /></p>
                        <h2 className="c-homeProfile-card-title">SKILL</h2>
                    </div>
                    <figcaption>
                      <dl className="c-homeProfile-card-block-def">
                        <dt>言語</dt>
                        <dd>HTML5・CSS3・SCSS・Javascript<br />
                        ・React.js・Node.js・Mysql</dd>
                      </dl>
                      <dl className="c-homeProfile-card-block-def">
                        <dt>CMS</dt>
                        <dd>Wordpress</dd>
                      </dl>
                      <dl className="c-homeProfile-card-block-def">
                        <dt>フレームワーク</dt>
                        <dd>Laravel</dd>
                      </dl>
                      <dl className="c-homeProfile-card-block-def">
                        <dt>デザインツール</dt>
                        <dd>Photoshop・Illustrator・AdobeXD</dd>
                      </dl>
                      <dl className="c-homeProfile-card-block-def">
                        <dt>その他</dt>
                        <dd>Git・Gulp、上級ウェブ解析士</dd>
                      </dl>
                    </figcaption>
                  </figure>
                </FadeInComponent>
            </div>
          </div>
      </div>
    </section>
  )
}
