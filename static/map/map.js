var map;
var image = "/static/icon.png";
var geocoder;
var allowedBounds;  // assign something here
var lastValidCenter;  // initialize this using map.getCenter()   

var shop = [
  {
    "address": "北海道 虻田郡 ニセコ町字近藤354-9",
    "fax": "FAX：0136-44-1568",
    "name": "武田弓具店",
    "tel": "TEL：0136-44-1567",
    "zipcode": "〒 048-1542",
    "location": {
      "lat": 42.7949381,
      "lng": 140.73041490000003
    }
  },
  {
    "address": "北海道 札幌市 手稲区前田一条10-3-14",
    "fax": "FAX：011-683-2855",
    "holiday": "定休日：2016年4/1～9/30：毎週水曜日・第1第3木曜日　　2016年10/1～2017年3/31：毎週水曜日・毎週木曜日",
    "hp": "ホームページ： http://www.terauchi-kyugu.co.jp/",
    "name": "（株）寺内弓具店",
    "opentime": "営業時間：10：00～18：00",
    "tel": "TEL：011-681-2498",
    "zipcode": "〒 006-0811",
    "location": {
      "lat": 43.1196273,
      "lng": 141.24583789999997
    }
  },
  {
    "address": "宮城県 仙台市 若林区土樋283-2",
    "fax": "FAX：022-223-1609",
    "holiday": "定休日：毎週水・日曜日（月2回不定休）",
    "hp": "ホームページ： http://www.gotokyugu.com/",
    "name": "（有）後藤弓具店",
    "opentime": "営業時間：9：30～18：30",
    "tel": "TEL：022-223-7609",
    "zipcode": "〒 984-0065",
    "location": {
      "lat": 38.2449593,
      "lng": 140.88476349999996
    }
  },
  {
    "address": "秋田県 南秋田郡 五城目町字稲荷前54-8",
    "fax": "FAX：018-852-2361",
    "holiday": "定休日：HPでご確認ください。",
    "hp": "ホームページ： http://www.nagasawa-kyugu.jp",
    "name": "（有）永澤弓具",
    "opentime": "営業時間：8：00～17：00",
    "tel": "TEL：018-852-3430",
    "zipcode": "〒 018-1743",
    "location": {
      "lat": 39.9499275,
      "lng": 140.1192992
    }
  },
  {
    "address": "秋田県 南秋田郡 五城目町小池字岡本下台105-4",
    "fax": "FAX：018-852-4743",
    "name": "御矢師永澤繁明",
    "tel": "TEL：018-852-4743",
    "zipcode": "〒 018-1746",
    "location": {
      "lat": 39.9488497,
      "lng": 140.10823670000002
    }
  },
  {
    "address": "福島県 いわき市 平字胡摩沢117",
    "fax": "FAX：0246-23-1848",
    "name": "伊東弓具店",
    "tel": "TEL：0246-23-1848",
    "zipcode": "〒 970-8026",
    "location": {
      "lat": 37.0614483,
      "lng": 140.88392640000006
    }
  },
  {
    "address": "福島県 郡山市 深田台2-8",
    "fax": "FAX：024-944-0010",
    "holiday": "定休日：不定休",
    "name": "佐藤吉哉弓具店",
    "opentime": "営業時間：9：00～18：00",
    "tel": "TEL：024-944-0010",
    "zipcode": "〒 963-8838",
    "location": {
      "lat": 37.3762097,
      "lng": 140.37820499999998
    }
  },
  {
    "address": "福島県 福島市",
    "holiday": "定休日：不定休（完全予約制）",
    "hp": "ホームページ： http://toyokuni.jimdo.com/",
    "name": "豊國　遠藤弘之",
    "zipcode": "〒 960-8254",
    "location": {
      "lat": 37.7608337,
      "lng": 140.47472819999996
    }
  },
  {
    "address": "茨城県 石岡市 小幡849",
    "fax": "FAX：0299-42-3659",
    "name": "矢師　助川　弘喜",
    "tel": "TEL：0299-42-3659",
    "zipcode": "〒 315-0155",
    "location": {
      "lat": 36.2238305,
      "lng": 140.15516690000004
    }
  },
  {
    "address": "茨城県 水戸市 宮町2-6-19",
    "fax": "FAX：029-225-2317",
    "holiday": "定休日：正月休み1/1～1/3",
    "name": "市毛弓具店",
    "opentime": "営業時間：平日8：30～19：00　日祝8：30～18：00",
    "tel": "TEL：029-231-0083",
    "zipcode": "〒 310-0015",
    "location": {
      "lat": 36.3732265,
      "lng": 140.47300180000002
    }
  },
  {
    "address": "茨城県 土浦市 中央2-5-16",
    "fax": "FAX：029-821-4729",
    "holiday": "定休日：木曜日（木曜日が祭日でもお休みとなります）",
    "name": "土浦弓具",
    "opentime": "営業時間：9：30～18：00",
    "tel": "TEL：029-821-4729",
    "zipcode": "〒 300-0043",
    "location": {
      "lat": 36.0833659,
      "lng": 140.20410790000005
    }
  },
  {
    "address": "茨城県 土浦市 蓮河原新町9-9",
    "fax": "FAX：029-821-6804",
    "holiday": "定休日：不定休",
    "name": "堀弓具店",
    "opentime": "営業時間：9：00～20：00",
    "tel": "TEL：029-821-6804",
    "zipcode": "〒 300-0821",
    "location": {
      "lat": 36.0717233,
      "lng": 140.2086246
    }
  },
  {
    "address": "茨城県 土浦市 田中1-5-18",
    "fax": "FAX：029-821-3725",
    "holiday": "定休日：第2・4週日曜日",
    "name": "助川弓具店",
    "opentime": "営業時間：9：00～18：00",
    "tel": "TEL：029-821-3725",
    "zipcode": "〒 300-0048",
    "location": {
      "lat": 36.0874593,
      "lng": 140.19203679999998
    }
  },
  {
    "address": "茨城県 桜川市 犬田1376",
    "name": "保田弓具店",
    "tel": "TEL：0296-75-4454",
    "zipcode": "〒 309-1217",
    "location": {
      "lat": 36.3583492,
      "lng": 140.1097552
    }
  },
  {
    "address": "栃木県 宇都宮市 中戸祭1-8-13",
    "fax": "FAX：028-625-6065",
    "holiday": "定休日：毎週木曜日、第3週水曜日、10～3月期間　第2週水曜日　追加",
    "hp": "ホームページ： http://www.japan-kyudo.com/",
    "name": "（有）堀江弓具店",
    "opentime": "営業時間：平日9：00～19：00　日祝9：00～18：00",
    "tel": "TEL：028-625-6065",
    "zipcode": "〒 320-0057",
    "location": {
      "lat": 36.5801924,
      "lng": 139.8688237
    }
  },
  {
    "address": "栃木県 足利市 助戸1-655-3",
    "fax": "FAX：0284-41-0298",
    "holiday": "定休日：水曜日",
    "name": "川田弓具店",
    "opentime": "営業時間：8：00～19：00",
    "tel": "TEL：0284-41-0298",
    "zipcode": "〒 326-0044",
    "location": {
      "lat": 36.3291669,
      "lng": 139.47219960000007
    }
  },
  {
    "address": "群馬県 伊勢崎市 宮子町3630-1",
    "fax": "FAX：0270-25-1027",
    "holiday": "定休日：毎週月曜日",
    "name": "高橋宗高弓具店",
    "opentime": "営業時間：9：00～18：00",
    "tel": "TEL：0270-25-1711",
    "zipcode": "〒 372-0801",
    "location": {
      "lat": 36.32833919999999,
      "lng": 139.16242080000006
    }
  },
  {
    "address": "群馬県 前橋市 紅雲町2-12-6",
    "fax": "FAX：027-221-6964",
    "name": "（有）中島弓具店",
    "tel": "TEL：027-221-6964",
    "zipcode": "〒 371-0025",
    "location": {
      "lat": 36.385235,
      "lng": 139.06601969999997
    }
  },
  {
    "address": "埼玉県 さいたま市 浦和区元町3-3-4",
    "fax": "FAX：048-871-0407",
    "holiday": "定休日：毎週水曜日",
    "name": "千葉弓具店（全日本弓道具協会会長）",
    "opentime": "営業時間：平日10：00～19：00　日祝10：00～18：00",
    "tel": "TEL：048-871-0405",
    "zipcode": "〒 330-0073",
    "location": {
      "lat": 35.8733696,
      "lng": 139.64884259999997
    }
  },
  {
    "address": "埼玉県 春日部市 六軒町122-1",
    "fax": "FAX：048-736-9701",
    "holiday": "定休日：月曜日、第1・3週火曜日",
    "name": "真家弓具店",
    "opentime": "営業時間：9：00～18：30",
    "tel": "TEL：048-736-9701",
    "zipcode": "〒 344-0012",
    "location": {
      "lat": 35.96473659999999,
      "lng": 139.78149340000004
    }
  },
  {
    "address": "千葉県 山武市 森1298",
    "fax": "FAX：0475-88-1197",
    "holiday": "定休日：実店舗:水曜日\r\n通販業務:水曜日・日曜日・祝日",
    "hp": "ホームページ： http://www.sambu.jp/",
    "name": "山武弓具店",
    "opentime": "営業時間：10：00～18：00",
    "tel": "TEL：0475-88-0005",
    "zipcode": "〒 289-1214",
    "location": {
      "lat": 35.623875,
      "lng": 140.36548070000003
    }
  },
  {
    "address": "東京都 豊島区 南大塚3-23-3",
    "fax": "FAX：03-3986-2302",
    "holiday": "定休日：お盆休み、お正月休み",
    "hp": "ホームページ： http://www.asahi-archery.co.jp/",
    "name": "アサヒ弓具工業（株）",
    "opentime": "営業時間：平日10：00～19：00　日・祭日10：00～17：00",
    "tel": "TEL：03-3986-2301",
    "zipcode": "〒 170-0005",
    "location": {
      "lat": 35.72861779999999,
      "lng": 139.7261069
    }
  },
  {
    "address": "東京都 千代田区 神田須田町1-6",
    "fax": "FAX：03-3256-2067",
    "holiday": "定休日：毎週月曜日、夏季・年末年始",
    "hp": "ホームページ： http://www.koyama-kyugu.com/",
    "name": "（株）小山弓具",
    "opentime": "営業時間：10：00～19：00　日祝10：00～18：00",
    "tel": "TEL：03-3256-2001",
    "zipcode": "〒 101-0041",
    "location": {
      "lat": 35.6950947,
      "lng": 139.7685136
    }
  },
  {
    "address": "東京都 台東区 東上野3-1-1",
    "fax": "FAX：03-3841-9429",
    "holiday": "定休日：火曜日",
    "name": "杉山正宗弓具店",
    "opentime": "営業時間：月～土曜日 9:00～19:00　日・祝日 9:00～18:00",
    "tel": "TEL：03-3841-9430",
    "zipcode": "〒 110-0015",
    "location": {
      "lat": 35.7096046,
      "lng": 139.7822595
    }
  },
  {
    "address": "東京都 杉並区 今川3-12-17",
    "fax": "FAX：03-5310-6191",
    "holiday": "定休日：毎週月曜日",
    "name": "(資)曽根正康",
    "opentime": "営業時間：9：00～19：00",
    "tel": "TEL：03-5310-6191",
    "zipcode": "〒 167-0035",
    "location": {
      "lat": 35.7160827,
      "lng": 139.60526240000002
    }
  },
  {
    "address": "東京都 江戸川区 南小岩7-15-9",
    "fax": "FAX：03-3657-6069",
    "holiday": "定休日：毎週月曜日、第1週火曜日",
    "name": "東京弓具製作所　江戸川店",
    "opentime": "営業時間：9：00～18：30　日祝9：00～17：00",
    "tel": "TEL：03-3657-6069",
    "zipcode": "〒 133-0056",
    "location": {
      "lat": 35.7302154,
      "lng": 139.883013
    }
  },
  {
    "address": "東京都 千代田区 飯田橋1-7-11",
    "fax": "FAX：03-3262-6807",
    "holiday": "定休日：第2・4週日曜日、祝日",
    "name": "山田吉邦弓具店",
    "opentime": "営業時間：平日9：00～18：30、土9：00～17：30　第1・3週日曜日9：00～16：30",
    "tel": "TEL：03-3261-1705",
    "zipcode": "〒 102-0072",
    "location": {
      "lat": 35.6989992,
      "lng": 139.74897310000006
    }
  },
  {
    "address": "東京都 板橋区",
    "name": "吉田弓具",
    "tel": "TEL：03-3932-8046",
    "zipcode": "〒 174-0065",
    "location": {
      "lat": 35.75116480000001,
      "lng": 139.7092437
    }
  },
  {
    "address": "東京都 町田市 相原町1236-5",
    "fax": "FAX：042-779-1500",
    "holiday": "定休日：毎週水曜日",
    "name": "松永弓具店",
    "opentime": "営業時間：平日9：00～18：00　日祝日9：00～17：00",
    "tel": "TEL：042-779-2525",
    "zipcode": "〒 194-0211",
    "location": {
      "lat": 35.6041126,
      "lng": 139.33048770000005
    }
  },
  {
    "address": "神奈川県 横浜市 南区永田東2-3-1　永田ビューハイツ318",
    "name": "山田　久雄",
    "tel": "TEL：045-743-2312",
    "zipcode": "〒 232-0072",
    "location": {
      "lat": 35.4360371,
      "lng": 139.59792300000004
    }
  },
  {
    "address": "神奈川県 伊勢原市 板戸356",
    "fax": "FAX：0463-95-0512",
    "holiday": "定休日：不定休",
    "name": "安田弓具店",
    "opentime": "営業時間：9：30～18：00",
    "tel": "TEL：0463-95-0512",
    "zipcode": "〒 259-1145",
    "location": {
      "lat": 35.4032404,
      "lng": 139.3030827
    }
  },
  {
    "address": "神奈川県 愛甲郡 愛川町中津3588",
    "holiday": "定休日：不定休　※訪問前にご連絡いただければ幸いです。",
    "name": "弓工房　今井",
    "opentime": "営業時間：8：00～20：00",
    "tel": "TEL：046-211-7720",
    "zipcode": "〒 243-0303",
    "location": {
      "lat": 35.5079821,
      "lng": 139.33652430000006
    }
  },
  {
    "address": "長野県 長野市 中御所1-12-5",
    "fax": "FAX：026-223-4855",
    "holiday": "定休日：月曜日",
    "hp": "ホームページ： http://www.nakajima-kyugu.com/",
    "name": "（有）中島弓具店",
    "opentime": "営業時間：8：00～18：00　日祝8：00～17：00",
    "tel": "TEL：026-228-3443",
    "zipcode": "〒 380-0935",
    "location": {
      "lat": 36.641453,
      "lng": 138.18356649999998
    }
  },
  {
    "address": "長野県 飯田市 諏訪町1",
    "name": "杉山弓弦製作所",
    "tel": "TEL：0265-22-6391",
    "zipcode": "〒 395-0018",
    "location": {
      "lat": 35.5222881,
      "lng": 137.82742889999997
    }
  },
  {
    "address": "静岡県 浜松市 南区若林町183-1",
    "fax": "FAX：053-440-0025",
    "holiday": "定休日：毎週木曜日、第2・4金曜日",
    "hp": "ホームページ： http://chikudou.com/",
    "name": "有限会社山内弓具店",
    "opentime": "営業時間：平日11：00～18：00　日祭日9：00～17：00",
    "tel": "TEL：053-440-9100",
    "zipcode": "〒 432-8051",
    "location": {
      "lat": 34.6866928,
      "lng": 137.70518119999997
    }
  },
  {
    "address": "静岡県 沼津市 西沢田107-7",
    "holiday": "定休日：なし",
    "hp": "ホームページ： http://hiraikyugu.com/",
    "name": "有限会社ヒライ弓具",
    "opentime": "営業時間：9：00～18：00",
    "tel": "TEL：055-926-6241",
    "zipcode": "〒 410-0007",
    "location": {
      "lat": 35.1147018,
      "lng": 138.84399039999994
    }
  },
  {
    "address": "静岡県 静岡市 葵区羽鳥4-18-14",
    "name": "（有）澤山弓弦製作所",
    "tel": "TEL：054-278-8046",
    "zipcode": "〒 421-1215",
    "location": {
      "lat": 34.9819164,
      "lng": 138.34351879999997
    }
  },
  {
    "address": "静岡県 静岡市 葵区常磐町2-12-2",
    "holiday": "定休日：毎週火曜日",
    "hp": "ホームページ： http://www.kouga-kyugu.jp/",
    "name": "（株）甲賀弓具店",
    "opentime": "営業時間：平日9：00～19：00　土日9：00～18：30",
    "tel": "TEL：054-252-1873",
    "zipcode": "〒 420-0034",
    "location": {
      "lat": 34.9705792,
      "lng": 138.38292909999996
    }
  },
  {
    "address": "静岡県 焼津市 東小川5-13-8",
    "fax": "FAX：054-626-3252",
    "name": "萩原ゆがけ店",
    "opentime": "営業時間：9：00～20：00",
    "tel": "TEL：054-628-1029",
    "zipcode": "〒 425-0035",
    "location": {
      "lat": 34.8554107,
      "lng": 138.3105134
    }
  },
  {
    "address": "静岡県 焼津市 東小川6-10-10",
    "fax": "FAX：054-628-6051",
    "holiday": "定休日：不定休",
    "hp": "ホームページ： http://www.rakuten.co.jp/sonekyu-/",
    "name": "曽根弓具店",
    "opentime": "営業時間：8：00～18：00",
    "tel": "TEL：054-628-6051",
    "zipcode": "〒 425-0035",
    "location": {
      "lat": 34.8534665,
      "lng": 138.31056609999996
    }
  },
  {
    "address": "静岡県 浜松市 北区三ヶ日町岡本872-1",
    "name": "横田弓弦製作所",
    "tel": "TEL：053-524-2457",
    "zipcode": "〒 431-1415",
    "location": {
      "lat": 34.8086087,
      "lng": 137.54631130000007
    }
  },
  {
    "address": "愛知県 豊橋市 西新町99",
    "fax": "FAX：0532-52-3481",
    "holiday": "定休日：毎週月曜日",
    "hp": "ホームページ： http://www.kyudogu.com/asaya/",
    "name": "有限会社朝矢弓具店",
    "opentime": "営業時間：9：00～19：00",
    "tel": "TEL：0532-52-3447",
    "zipcode": "〒 440-0811",
    "location": {
      "lat": 34.7643115,
      "lng": 137.399946
    }
  },
  {
    "address": "愛知県 岡崎市 福岡町北居士47",
    "fax": "FAX：0564-54-5025",
    "holiday": "定休日：土、日、祝日",
    "hp": "ホームページ： http://www.koyamaya.com/",
    "name": "有限会社小山矢",
    "opentime": "営業時間：9：00~18：00",
    "tel": "TEL：0564-52-3658",
    "zipcode": "〒 444-0825",
    "location": {
      "lat": 34.9055852,
      "lng": 137.15118659999996
    }
  },
  {
    "address": "愛知県 岡崎市 門前町70",
    "fax": "FAX：0564-21-2606",
    "holiday": "定休日：毎週火曜日、第2・4水曜日",
    "name": "有限会社林忠兵衛弓具店",
    "opentime": "営業時間：10：00～19：00",
    "tel": "TEL：0564-21-4556",
    "zipcode": "〒 444-0032",
    "location": {
      "lat": 34.95952250000001,
      "lng": 137.17147109999996
    }
  },
  {
    "address": "愛知県 豊田市 足助町落合13-20",
    "fax": "FAX：0565-62-0223",
    "holiday": "定休日：不定休",
    "hp": "ホームページ： http://kyugu.jugem.jp",
    "name": "いろは弓具店",
    "opentime": "営業時間：8：00～19：00（夏期6：00～19：00）",
    "tel": "TEL：0565-62-0113",
    "zipcode": "〒 444-2424",
    "location": {
      "lat": 35.1357272,
      "lng": 137.31410389999996
    }
  },
  {
    "address": "愛知県 名古屋市 北区丸新町263",
    "fax": "FAX：052-902-7315",
    "holiday": "定休日：土、日、祝日",
    "hp": "ホームページ： http://www.katokyugu.com/",
    "name": "有限会社加藤弓具店",
    "opentime": "営業時間：8：00～17：00",
    "tel": "TEL：052-901-0813",
    "zipcode": "〒 462-0063",
    "location": {
      "lat": 35.23236,
      "lng": 136.91163749999998
    }
  },
  {
    "address": "愛知県 名古屋市 北区丸新町281-2",
    "fax": "FAX：052-901-5553",
    "holiday": "定休日：土、日、祝日",
    "hp": "ホームページ： http://www.ishibashi-ya.jp/",
    "name": "有限会社石橋屋",
    "opentime": "営業時間：9：00～17：00",
    "tel": "TEL：052-901-5540",
    "zipcode": "〒 462-0063",
    "location": {
      "lat": 35.2328294,
      "lng": 136.9110237
    }
  },
  {
    "address": "愛知県 名古屋市 千種区猫洞通5-2-6",
    "fax": "FAX：052-752-0222",
    "holiday": "定休日：毎週月・火曜日",
    "hp": "ホームページ： http://www.nagokyu.com",
    "name": "ナゴヤ弓具本店",
    "opentime": "営業時間：平日10：00～19：00　日・祭日10：00～18：00",
    "tel": "TEL：052-752-5222",
    "zipcode": "〒 464-0032",
    "location": {
      "lat": 35.1654649,
      "lng": 136.96532100000002
    }
  },
  {
    "address": "愛知県 名古屋市 瑞穂区高田町3-17",
    "fax": "FAX：052-841-8265",
    "holiday": "定休日：木曜日",
    "hp": "ホームページ： http://www.matsunamisahei.jp/",
    "name": "松波佐平弓具店",
    "opentime": "営業時間：10：00～19：00",
    "tel": "TEL：052-841-8265",
    "zipcode": "〒 467-0808",
    "location": {
      "lat": 35.1346512,
      "lng": 136.93316349999998
    }
  },
  {
    "address": "愛知県 春日井市 割塚町28",
    "fax": "FAX：0568-84-6298",
    "hp": "ホームページ： http://okumura-kyugu.com/",
    "name": "有限会社奥村綜合弓具",
    "tel": "TEL：0568-85-3788",
    "zipcode": "〒 486-0824",
    "location": {
      "lat": 35.2457398,
      "lng": 136.98520329999997
    }
  },
  {
    "address": "愛知県 一宮市 松降1-7-2",
    "fax": "FAX：0586-24-3262",
    "holiday": "定休日：月曜日",
    "name": "幽林堂弓具店",
    "opentime": "営業時間：平日10：00～19：00　土日10：00～18：00",
    "tel": "TEL：0586-24-1259",
    "zipcode": "〒 491-0042",
    "location": {
      "lat": 35.307248,
      "lng": 136.80499350000002
    }
  },
  {
    "address": "滋賀県 大津市 長等2-3-9",
    "fax": "FAX：077-522-7610",
    "holiday": "定休日：水曜日",
    "name": "（有）大倉弓具店",
    "opentime": "営業時間：平日9：00～19：30　日祭9：00～16：00",
    "tel": "TEL：077-522-7603",
    "zipcode": "〒 520-0046",
    "location": {
      "lat": 35.0087329,
      "lng": 135.85955450000006
    }
  },
  {
    "address": "京都府 京都市 西京区川島調子町74-90",
    "fax": "FAX：075-391-6466",
    "holiday": "定休日：なし",
    "name": "今井弓具店",
    "opentime": "営業時間：平日9：00～19：00　土日祝9：00～17：00",
    "tel": "TEL：075-381-3685",
    "zipcode": "〒 615-8125",
    "location": {
      "lat": 34.9724083,
      "lng": 135.69806640000002
    },
    "visit": [
        {
            "url": "/blog/article0005",
            "title": "弓具店探访——今井弓具店"
        },
    ]
  },
  {
    "address": "京都府 京都市 下京区須浜町657",
    "fax": "FAX：075-351-1499",
    "name": "御弓師　柴田勘十郎",
    "tel": "TEL：075-351-1491",
    "zipcode": "〒 600-8048",
    "location": {
      "lat": 34.9980654,
      "lng": 135.76601299999993
    }
  },
  {
    "address": "大阪府 大阪市 淀川区木川西2-2-4",
    "fax": "FAX：06-6301-2507",
    "holiday": "定休日：毎週水曜日",
    "hp": "ホームページ： http://www.ikai-kyugu.jp/",
    "name": "（有）猪飼弓具店",
    "opentime": "営業時間：平日9：30～19：30　日・祝日10：00～15：00",
    "tel": "TEL：06-6301-2019",
    "zipcode": "〒 532-0013",
    "location": {
      "lat": 34.7225507,
      "lng": 135.4899603
    }
  },
  {
    "address": "島根県 松江市 天神町35",
    "fax": "FAX：0852-22-9795",
    "holiday": "定休日：日曜、祝日",
    "hp": "ホームページ： http://www.matsudadenki.com/",
    "name": "（有）松田電気店",
    "opentime": "営業時間：9：00～18：00",
    "tel": "TEL：0852-24-9562",
    "zipcode": "〒 690-0064",
    "location": {
      "lat": 35.4629187,
      "lng": 133.05610230000002
    }
  },
  {
    "address": "山口県 周南市 青山町10-1",
    "fax": "FAX：0834-21-2701",
    "holiday": "定休日：月曜日",
    "hp": "ホームページ： http://www.h-yumiya.com/",
    "name": "細山田弓具店",
    "tel": "TEL：0834-21-2717",
    "zipcode": "〒 745-0842",
    "location": {
      "lat": 34.0437508,
      "lng": 131.82045960000005
    }
  },
  {
    "address": "香川県 坂出市 府中町865-3",
    "fax": "FAX：0877-48-0956",
    "holiday": "定休日：月曜日",
    "hp": "ホームページ： http://www.rakuten.co.jp/suekane/",
    "name": "（有）スエカネ弓具店",
    "opentime": "営業時間：9：00～18：00",
    "tel": "TEL：0877-48-0886",
    "zipcode": "〒 762-0024",
    "location": {
      "lat": 34.29652,
      "lng": 133.92152780000004
    }
  },
  {
    "address": "福岡県 北九州市 小倉北区下到津5-2-18",
    "fax": "FAX：093-561-5254",
    "hp": "ホームページ： http://www13.plala.or.jp/kusumi/",
    "name": "くすみ弓具店",
    "tel": "TEL：093-561-5254",
    "zipcode": "〒 803-0846",
    "location": {
      "lat": 33.8756128,
      "lng": 130.85721460000002
    }
  },
  {
    "address": "福岡県 筑後市 和泉285-7",
    "fax": "FAX：0942-53-7912",
    "name": "本家相良弓矢製作所",
    "opentime": "営業時間：9：00～18：00",
    "tel": "TEL：0942-53-2712",
    "zipcode": "〒 833-0041",
    "location": {
      "lat": 33.207778,
      "lng": 130.49837379999997
    }
  },
  {
    "address": "福岡県 八女市 本町93",
    "fax": "FAX：0943-22-6387",
    "hp": "ホームページ： http://www.ab.auone-net.jp/~paradiso/",
    "name": "相良矢工房",
    "opentime": "営業時間：8：00～18：00",
    "tel": "TEL：0943-23-2803",
    "zipcode": "〒 834-0031",
    "location": {
      "lat": 33.2096732,
      "lng": 130.5589526
    }
  },
  {
    "address": "福岡県 福岡市 南区柏原4-22-25",
    "fax": "FAX：092-555-8926",
    "holiday": "定休日：土、日、祝日",
    "hp": "ホームページ： http://www.soyakyugu.com/",
    "name": "（有）征矢弓具製作所",
    "opentime": "営業時間：9：00～18：00",
    "tel": "TEL：092-555-8921",
    "zipcode": "〒 811-1353",
    "location": {
      "lat": 33.5264977,
      "lng": 130.39901499999996
    }
  },
  {
    "address": "福岡県 久留米市 中央町22-11",
    "fax": "FAX：0942-30-0555",
    "name": "中村的屋",
    "tel": "TEL：0942-33-2810",
    "zipcode": "〒 830-0023",
    "location": {
      "lat": 33.3192754,
      "lng": 130.50643209999998
    }
  },
  {
    "address": "熊本県 熊本市 南区鳶町2丁目5-1",
    "fax": "FAX：096-320-4515",
    "holiday": "定休日：月曜・火曜（祝日の場合も定休）",
    "hp": "ホームページ： http://www.heisei-kyugu.com/",
    "name": "平成弓具",
    "opentime": "営業時間：9：00～18：00　日祝9：00～17：00",
    "tel": "TEL：096-320-4505",
    "zipcode": "〒 861-4135",
    "location": {
      "lat": 32.7601981,
      "lng": 130.67586749999998
    }
  },
  {
    "name": "竹弓製造　松永佳也"
  },
  {
    "address": "熊本県 熊本市 中央区九品寺1-17-6",
    "fax": "FAX：096-364-4220",
    "holiday": "定休日：毎週月曜日",
    "name": "高橋弓具老舗",
    "opentime": "営業時間：9：30～21：00　日祭日9：30～16：00",
    "tel": "TEL：096-364-4220",
    "zipcode": "〒 862-0976",
    "location": {
      "lat": 32.7975121,
      "lng": 130.71385179999993
    }
  },
  {
    "address": "熊本県 熊本市 中央区大江4-17-29",
    "fax": "FAX：096-364-0271",
    "holiday": "定休日：日曜・祭日",
    "hp": "ホームページ： http://www.takakyu.com/",
    "name": "有限会社タカハシ弓具店",
    "opentime": "営業時間：9：00～18：00",
    "tel": "TEL：096-364-0273",
    "zipcode": "〒 862-0971",
    "location": {
      "lat": 32.8006552,
      "lng": 130.72308480000004
    }
  },
  {
    "name": "肥後三郎松永萬義弓製作所"
  },
  {
    "name": "松永重宣弓製作所",
    "tel": "TEL：0966-24-7829"
  },
  {
    "address": "大分県 別府市 上田の湯町7-27",
    "fax": "FAX：0977-23-4516",
    "name": "安部弓道具店",
    "tel": "TEL：0977-23-4516",
    "zipcode": "〒 874-0908",
    "location": {
      "lat": 33.2778458,
      "lng": 131.49717999999996
    }
  },
  {
    "address": "宮崎県 北諸県郡 三股町樺山3987-2",
    "fax": "FAX：0986-52-3719",
    "holiday": "定休日：日曜日",
    "name": "小倉大弓製作所",
    "opentime": "営業時間：9：00～18：00",
    "tel": "TEL：0986-52-2040",
    "zipcode": "〒 889-1901",
    "location": {
      "lat": 31.7348213,
      "lng": 131.13111979999996
    }
  },
  {
    "address": "宮崎県 都城市 早鈴町2016",
    "fax": "FAX：0986-24-5248",
    "holiday": "定休日：日、祝日",
    "name": "楠見蔵吉弓製作所",
    "opentime": "営業時間：8：30~17：00",
    "tel": "TEL：0986-24-5248",
    "zipcode": "〒 885-0055",
    "location": {
      "lat": 31.714794,
      "lng": 131.07790109999996
    }
  },
  {
    "address": "宮崎県 都城市 八幡町16-6",
    "fax": "FAX：0986-23-5402",
    "holiday": "定休日：日、祝日",
    "name": "新宮素直弓製作所",
    "opentime": "営業時間：9：00～17：00",
    "tel": "TEL：0986-23-5402",
    "zipcode": "〒 885-0075",
    "location": {
      "lat": 31.7195484,
      "lng": 131.05625229999998
    }
  },
  {
    "address": "宮崎県 都城市 梅北町4204-1",
    "fax": "FAX：0986-39-5423",
    "hp": "ホームページ： http://www.issui.tv/",
    "name": "（有）永野一萃",
    "tel": "TEL：0986-39-2512",
    "zipcode": "〒 885-0063",
    "location": {
      "lat": 31.6768725,
      "lng": 131.05943819999993
    }
  },
  {
    "address": "宮崎県 都城市 早鈴町1524",
    "fax": "FAX：0986-24-0667",
    "hp": "ホームページ： http://www.0986.jp/yumi/yum5.html",
    "name": "南崎寿宝大弓製作所",
    "tel": "TEL：0986-24-0667",
    "zipcode": "〒 885-0055",
    "location": {
      "lat": 31.714005,
      "lng": 131.07350139999994
    }
  },
  {
    "address": "宮崎県 都城市 都原町3350-16",
    "fax": "FAX：0986-24-5762",
    "holiday": "定休日：なし",
    "name": "大菴聖心大弓製作所",
    "tel": "TEL：0986-24-5762",
    "zipcode": "〒 885-0094",
    "location": {
      "lat": 31.731811,
      "lng": 131.04721410000002
    }
  },
  {
    "address": "宮崎県 都城市 妻ケ丘町8-14",
    "fax": "FAX：0986-22-4009",
    "holiday": "定休日：日、祝日、隔週土曜日",
    "hp": "ホームページ： http://www.0986.jp/yumi/yum7.html",
    "name": "（有）横山黎明弓製作所",
    "opentime": "営業時間：8：00～17：00",
    "tel": "TEL：0986-22-4604",
    "zipcode": "〒 885-0033",
    "location": {
      "lat": 31.7306675,
      "lng": 131.07496190000006
    }
  },
  {
    "address": "宮崎県 宮崎市 東大宮4-10-18",
    "fax": "FAX：0985-29-8053",
    "hp": "ホームページ： http://ikeda-kyuugu.com/",
    "name": "池田弓具店",
    "tel": "TEL：0985-29-8033",
    "zipcode": "〒 880-0825",
    "location": {
      "lat": 31.9440974,
      "lng": 131.43935269999997
    }
  },
  {
    "address": "宮崎県 宮崎市 吉村町大町前2864-4",
    "fax": "FAX：0985-23-2725",
    "hp": "ホームページ： http://www.mori-kyu.com/",
    "name": "守山弓具店",
    "tel": "TEL：0985-23-2742",
    "zipcode": "〒 880-0841",
    "location": {
      "lat": 31.9131624,
      "lng": 131.44271130000004
    }
  },
  {
    "address": "鹿児島県 霧島市 隼人町神宮6-5-5",
    "fax": "FAX：0995-42-2298",
    "name": "桑幡正清大弓製作所",
    "tel": "TEL：0995-42-2298",
    "zipcode": "〒 899-5121",
    "location": {
      "lat": 31.7490533,
      "lng": 130.7428685
    }
  },
  {
    "address": "鹿児島県 霧島市 隼人町神宮2-6-26",
    "fax": "FAX：0995-42-2273",
    "name": "桑幡元象大弓製作所",
    "tel": "TEL：0995-42-2273",
    "zipcode": "〒 899-5121",
    "location": {
      "lat": 31.7516279,
      "lng": 130.73966589999998
    }
  },
  {
    "address": "鹿児島県 鹿屋市 本町3-7",
    "fax": "FAX：0994-43-0222",
    "holiday": "定休日：火曜日",
    "hp": "ホームページ： http://ono-kyudougu.com/",
    "name": "小野弓具店",
    "opentime": "営業時間：10：00～18：30",
    "tel": "TEL：0994-43-0222",
    "zipcode": "〒 893-0002",
    "location": {
      "lat": 31.3870247,
      "lng": 130.85181609999995
    }
  },
  {
    "address": "鹿児島県 鹿児島市 山下町12-10",
    "fax": "FAX：099-225-5329",
    "holiday": "定休日：第1・3・5週火曜日",
    "hp": "ホームページ： http://tokudakyugu.com/",
    "name": "（有）徳田弓道具店",
    "opentime": "営業時間：9:00~19:00",
    "tel": "TEL：099-222-4330",
    "zipcode": "〒 892-0816",
    "location": {
      "lat": 31.5974895,
      "lng": 130.55724629999997
    }
  },
  {
    "address": "愛知県 名古屋市 中区栄5-10-23",
    "fax": "FAX：052-241-4007",
    "holiday": "定休日：日、月、祝日",
    "hp": "ホームページ： http://suizan.co.jp/",
    "name": "弓道具商　翠山",
    "opentime": "営業時間：10：00～19：00",
    "tel": "TEL：052-241-3973",
    "zipcode": "〒 460-0008",
    "visit": [
	{
            "url": "/blog/gjdtfcsgjd",
            "title": "弓具店探访——翠山弓具店（野间 彰）"
	}
    ],
    "location": {
      "lat": 35.1636935,
      "lng": 136.91375600000003
    }
  },
  {
    "address": "東京都 港区 三田4-8-34",
    "fax": "FAX：03-3451-7099",
    "holiday": "定休日：第２、第４日曜日",
    "hp": "ホームページ： http://hasegawa-kyuguten.com/",
    "name": "長谷川弓具店",
    "opentime": "営業時間：9：30～19：00",
    "tel": "TEL：03-3451-7440",
    "zipcode": "〒 108-0073",
    "location": {
      "lat": 35.6426612,
      "lng": 139.73728979999999
    },
    "visit": [
        {
            "url": "/blog/gjdtfcgcgjd",
            "title": "弓具店探访——長谷川弓具店（富江）"
        },
        {
            "url": "/blog/gjdtfcgcgjd2",
            "title": "弓具店探访——長谷川弓具店（二）（野间 彰）"
        }
    ]
  },
  {
    "address": "岡山県 岡山市 中区中納言町2-39",
    "fax": "FAX：086-272-4469",
    "holiday": "定休日：毎週月曜日第2・4火曜日（祝日の場合は営業いたします）",
    "hp": "ホームページ： http://www.washimi99.jp/index.html",
    "name": "（有）鷲見弓具",
    "opentime": "営業時間：平日9：30～19：00　日祝9：30～17：00",
    "tel": "TEL：086-272-4425",
    "zipcode": "〒 703-8292",
    "location": {
      "lat": 34.6603181,
      "lng": 133.9394969
    },
    "visit": [
        {   
            "url": "/blog/gjdtfjjgjd",
            "title": "弓具店探访——鹫见弓具店（富江）"
        }
    ]
  },
  {
    "address": "埼玉県 さいたま市 大宮区東町2-84-2",
    "fax": "FAX：048-645-5879",
    "holiday": "定休日：毎週火曜日、第1月曜日",
    "name": "東京弓具製作所　さいたま店",
    "opentime": "営業時間：9：00～19：00",
    "tel": "TEL：048-645-5879",
    "zipcode": "〒 330-0841",
    "location": {
      "lat": 35.9083257,
      "lng": 139.63176199999998
    },
    "visit": [
        {   
            "url": "/blog/gjdtfdjgjzzs",
            "title": "弓具店探访——东京弓具制作所 さいたま（埼玉店）（野间 彰）"
        }
    ]
  },
  {
    "address": "福岡県 久留米市 合川町2137-1",
    "fax": "FAX：0942-37-2970",
    "hp": "ホームページ： http://www.siramizu.co.jp/",
    "name": "（有）しらみず弓道具店",
    "tel": "TEL：0942-35-4323",
    "zipcode": "〒 839-0861",
    "location": {
      "lat": 33.3149288,
      "lng": 130.52946309999993
    },
    "visit": [
        {   
            "url": "/blog/gjdtfslmzgjd",
            "title": "弓具店探访——しらみず弓具店（Karen）"
        }
    ]
  },
]

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 38.057549, lng: 137.496112},
        zoom: 6,
minZoom:6,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false
    });
    geocoder = new google.maps.Geocoder();
google.maps.event.addListenerOnce(map, 'idle', function(){
    allowedBounds = this.getBounds();
lastValidCenter=this.getCenter();
	//console.log(map);
    //console.log(allowedBounds);
   //console.log(this.getBounds());
    });
}


function initOneMark(geocoder, shop){
    if (shop.location == undefined) return ;
    data = {
        position: shop.location,
        map: map,
        title: shop.title
    }
    content = '<div>'+
                '<div>'+
                '</div>'+
                '<h1  class="firstHeading">' + shop.name + '</h1>';
    if (shop.address != undefined) content += '<div>' + shop.address + '</div>';
    if (shop.fax != undefined) content += '<div>' + shop.fax + '</div>';
    if (shop.holiday != undefined) content += '<div>' + shop.holiday + '</div>';
    if (shop.hp != undefined) content += '<div>' + shop.hp + '</div>';
    if (shop.opentime != undefined) content += '<div>' + shop.opentime + '</div>';
    if (shop.tel != undefined) content += '<div>' + shop.tel + '</div>';
    if (shop.zipcode != undefined) content += '<div>' + shop.zipcode + '</div>';
    if (shop.visit != undefined){
	for (var x in shop.visit){
		content += '<div><a href="' + shop.visit[x].url + '">' + shop.visit[x].title +  '</a></div>';
	}
	data.icon = image;
    }
    content += '</div>';
    var infowindow = new google.maps.InfoWindow({
        content: content
    }); 
    var marker = new google.maps.Marker(data);
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
}

function initMark(){
	for (var i = 0; i < shop.length; ++i)
		initOneMark(geocoder, shop[i]);
}
function checkBounds() {  // when bounds changes due to resizing or zooming in/out

    var currentBounds = map.getBounds();
    if (currentBounds == null) return;
    if (allowedBounds == null) return;
      var allowed_ne_lng = allowedBounds.getNorthEast().lng();
      var allowed_ne_lat = allowedBounds.getNorthEast().lat();
      var allowed_sw_lng = allowedBounds.getSouthWest().lng();
      var allowed_sw_lat = allowedBounds.getSouthWest().lat();
	//console.log("hehe");
    var wrap;
    var cc = map.getCenter();
    var centerH = false;
    var centerV = false;

    // Check horizontal wraps and offsets
    if ( currentBounds.toSpan().lng() > allowedBounds.toSpan().lng() ) {
        centerH = true;
    }
    else {  // test positive and negative wrap respectively
        wrap = currentBounds.getNorthEast().lng() < cc.lng();
        var current_ne_lng = !wrap ?   currentBounds.getNorthEast().lng()  : allowed_ne_lng +(currentBounds.getNorthEast().lng() + 180 )  + (180 - allowed_ne_lng);
        wrap = currentBounds.getSouthWest().lng() > cc.lng();
        var current_sw_lng = !wrap ?  currentBounds.getSouthWest().lng() : allowed_sw_lng - (180-currentBounds.getSouthWest().lng()) - (allowed_sw_lng+180);
    }


    // Check vertical wraps and offsets
    if ( currentBounds.toSpan().lat() > allowedBounds.toSpan().lat() ) {
        centerV = true;
    }
    else { // test positive and negative wrap respectively
    wrap = currentBounds.getNorthEast().lat()   < cc.lat();    if (wrap) { alert("WRAp detected top") } // else alert("no wrap:"+currentBounds); wrap = false;
      var current_ne_lat =  !wrap ? currentBounds.getNorthEast().lat()  : allowed_ne_lat + (currentBounds.getNorthEast().lat() +90) + (90 - allowed_ne_lat);
      wrap = currentBounds.getSouthWest().lat() > cc.lat();  if (wrap) { alert("WRAp detected btm") } //alert("no wrap:"+currentBounds);
      var current_sw_lat = !wrap ?  currentBounds.getSouthWest().lat() : allowed_sw_lat - (90-currentBounds.getSouthWest().lat()) - (allowed_sw_lat+90);
    }


      // Finalise positions
      var centerX = cc.lng();
      var centerY = cc.lat();
     if (!centerH) {
        if (current_ne_lng > allowed_ne_lng) centerX -= current_ne_lng-allowed_ne_lng;
        if (current_sw_lng < allowed_sw_lng) centerX += allowed_sw_lng-current_sw_lng;
     }
     else {
         centerX = allowedBounds.getCenter().lng();
     }

     if (!centerV) {
       if (current_ne_lat > allowed_ne_lat) {
           centerY -= (current_ne_lat-allowed_ne_lat) * 3;  // approximation magic numbeer. Adjust as u see fit, or use a more accruate pixel measurement.
       }
       if (current_sw_lat < allowed_sw_lat) {
           centerY += (allowed_sw_lat-current_sw_lat)*2.8;  // approximation magic number
       }
     }
     else {
        centerY = allowedBounds.getCenter().lat();
     }
     //console.log(centerX);
	//console.log(centerY);
//console.log(new google.maps.LatLng(centerY,centerX));
	lastValidCenter = new google.maps.LatLng(centerY,centerX);
//console.log(lastValidCenter);
     map.setCenter(lastValidCenter);
}



function limitBound(bound) // Occurs during dragging, pass allowedBounds to this function in most cases. Requires persistant 'lastValidCenter=map.getCenter()' var reference.
{
     
	
        var mapBounds = map.getBounds();

         if (   mapBounds.getNorthEast().lng() >=  mapBounds.getSouthWest().lng() && mapBounds.getNorthEast().lat()  >= mapBounds.getSouthWest().lat()  // ensure no left/right, top/bottom wrapping
            && bound.getNorthEast().lat() > mapBounds.getNorthEast().lat()  // top
            && bound.getNorthEast().lng() > mapBounds.getNorthEast().lng() // right
            && bound.getSouthWest().lat() < mapBounds.getSouthWest().lat() // bottom
            && bound.getSouthWest().lng() < mapBounds.getSouthWest().lng()) // left
            {
                lastValidCenter=map.getCenter();  // valid case, set up new valid center location
            }

        //   if (bound.contains(map.getCenter()))
        // {
	console.log("x");
	console.log(lastValidCenter);
                map.panTo(lastValidCenter);console.log("y");
             //  }

}
$(document).ready(function(){
    initMap();
    initMark();
    
    google.maps.event.addListener(map, 'zoom_changed', function() {
        //var zoom = map.getZoom();
        checkBounds();
    });

    google.maps.event.addListener(map, "bounds_changed", function() {

        checkBounds();
    });

    google.maps.event.addListener(map, 'center_changed', function() {
          limitBound(allowedBounds);
    }); 
});
