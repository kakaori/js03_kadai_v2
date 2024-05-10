// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, getAdditionalUserInfo }
    from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getDatabase, ref, push, set, onChildAdded, remove, onChildRemoved, update, onChildChanged }
    from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDwapTF1UqtZ6NaJWZku07IvTPoDYbzIfs",
    authDomain: "ideageneration-a68ad.firebaseapp.com",
    databaseURL: "https://ideageneration-a68ad-default-rtdb.firebaseio.com",
    projectId: "ideageneration-a68ad",
    storageBucket: "ideageneration-a68ad.appspot.com",
    messagingSenderId: "823273349695",
    appId: "1:823273349695:web:794038a8219a655896ce8a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app); // RealtimeDatabase使うよ

const dbReftheme = ref(db, "theme/");
// const newPostRef = push(dbReftheme);
// set(newPostRef,{theme: 'test', useId: 'tkns'});


// const themeText = "机,椅子,本,鉛筆,ペン,ノート,カバン,時計,カレンダー,ガラス,ドア,窓,テレビ,冷蔵庫,電子レンジ,扇風機,照明,洗濯機,ソファ,クッション,ベッド,枕,布団,掃除機,ダストパン,箒,ゴミ箱,ハンカチ,財布,靴,傘,スカーフ,ジーンズ,シャツ,靴下,時計,財布,バッグ,カメラ,イヤホン,ヘッドフォン,マウス,キーボード,スマートフォン,モバイルバッテリー,ゲーム,ベッドルーム,リビングルーム,ダイニングルーム,キッチン,バスルーム,トイレ,シャワー,バスタブ,洗面台,鏡,タオル,シャンプー,コンディショナー,ボディーソープ,歯磨き粉,歯ブラシ,トイレットペーパー, ティッシュ, ソース, 醤油, ケチャップ, マヨネーズ, マスタード, ハチミツ, ソーセージ, ハム, チーズ, ヨーグルト, 卵, パン, 米, 麺, 肉, 魚, 野菜, 果物, ジュース, お茶, コーヒー, 水, ビール, ワイン, お酒, ケーキ, クッキー, チョコレート, アイスクリーム, ポテトチップス, スナック, パンケーキ, ピザ, ハンバーガー, サンドイッチ, 寿司, ラーメン, カレー, 焼肉, しゃぶしゃぶ, 鍋, 天ぷら, 唐揚げ, 焼き鳥, 串カツ, たこ焼き, お好み焼き, フライドチキン, ステーキ, ホットドッグ, タコス";

// // button#theme_save のトリガー
// const words = themeText.split(',');
// const uid = 'aaaaaa';
// // const dbReftheme = ref(db, "theme/");

// for (let i = 0; i < words.length; i++) {
//     const themewords = {
//         userId: uid,
//         theme: words[i].trim() //trim空白を消す
//     }
//     const newPostRef = push(dbReftheme);
//     set(newPostRef,themewords);
// }


//###############################################
//GoogleAuth(認証用)
//###############################################
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
const auth = getAuth();

let dataCount = 0;
let dataInserted = 0;

//###############################################
//Login処理
//###############################################
$("#login").on("click", function () {
    //Google認証完了後の処理
    signInWithPopup(auth, provider).then((result) => {
        //Login後のページ遷移

        const etAdditional = getAdditionalUserInfo(result);

        if (etAdditional.isNewUser) {
            // 初めてのログインの場合の処理

            const themeText = "机,椅子,本,鉛筆,ペン,ノート,カバン,時計,カレンダー,ガラス,ドア,窓,テレビ,冷蔵庫,電子レンジ,扇風機,照明,洗濯機,ソファ,クッション,ベッド,枕,布団,掃除機,ダストパン,箒,ゴミ箱,ハンカチ,財布,靴,傘,スカーフ,ジーンズ,シャツ,靴下,時計,財布,バッグ,カメラ,イヤホン,ヘッドフォン,マウス,キーボード,スマートフォン,モバイルバッテリー,ゲーム,ベッドルーム,リビングルーム,ダイニングルーム,キッチン,バスルーム,トイレ,シャワー,バスタブ,洗面台,鏡,タオル,シャンプー,コンディショナー,ボディーソープ,歯磨き粉,歯ブラシ,トイレットペーパー, ティッシュ, ソース, 醤油, ケチャップ, マヨネーズ, マスタード, ハチミツ, ソーセージ, ハム, チーズ, ヨーグルト, 卵, パン, 米, 麺, 肉, 魚, 野菜, 果物, ジュース, お茶, コーヒー, 水, ビール, ワイン, お酒, ケーキ, クッキー, チョコレート, アイスクリーム, ポテトチップス, スナック, パンケーキ, ピザ, ハンバーガー, サンドイッチ, 寿司, ラーメン, カレー, 焼肉, しゃぶしゃぶ, 鍋, 天ぷら, 唐揚げ, 焼き鳥, 串カツ, たこ焼き, お好み焼き, フライドチキン, ステーキ, ホットドッグ, タコス";

            // button#theme_save のトリガー
            const words = themeText.split(',');
            const uid = result.user.uid;
            // const dbReftheme = ref(db, "theme/");

            dataCount = words.length;
            for (let i = 0; i < words.length; i++) {
                const themewords = {
                    userId: uid,
                    theme: words[i].trim()//trim空白を消す
                }
                const newPostRef = push(dbReftheme);
                set(newPostRef, themewords);
            }
        }
    })
});

onChildAdded(dbReftheme, () => {
    dataInserted++;
    if (dataInserted >= dataCount) {
        location.href = "index.html";
    }
})