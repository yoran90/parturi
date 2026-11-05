import React from 'react'
import Information from '../components/up-header/Information'
import HeaderText from '../components/header-text/HeaderText'
import HolyDay from '../components/holy-day/HolyDay'
import Header from '../components/header/Header'
import { FaPlus, FaMinus } from "react-icons/fa";
import Map from '../components/map/Map'
import Footer from '../components/footer/Footer'

const frequentlyQuestions = [
  {
    question: "Tarvitseeko hiustenleikkaukseen varata aika?",
    answer: "Ei tarvitse! Meillä voit asioida ilman ajanvarausta. Voit tulla suoraan liikkeeseemme aukioloaikojemme puitteissa. Palvelemme asiakkaita saapumisjärjestyksessä ja pyrimme tekemään käynnistäsi mahdollisimman sujuvan."
  },
  {
    question: "Voinko tulla parturiin ilman ajanvarausta kiireisenä päivänä?",
    answer: "Kyllä voit! Palvelemme asiakkaita ilman ajanvarausta myös kiireisinä päivinä. Jos liikkeessä on paljon asiakkaita, saatat joutua odottamaan hetken omaa vuoroasi. Teemme parhaamme, jotta pääset parturiin mahdollisimman nopeasti."
  },
  {
    question: "Otatteko vastaan uusia asiakkaita?",
    answer: "Totta kai! Uudet asiakkaat ovat aina lämpimästi tervetulleita liikkeeseemme. Meille jokainen asiakas on tärkeä, ja haluamme tarjota jokaiselle ystävällistä palvelua sekä onnistuneen hiustenleikkauksen."
  },
  {
    question: "Voinko tulla parturiin, vaikka en tiedä millaisen hiusmallin haluan?",
    answer: "Ehdottomasti! Sinun ei tarvitse tietää valmiiksi, millaisen hiusmallin haluat. Voimme keskustella yhdessä erilaisista vaihtoehdoista ja auttaa löytämään sinulle sopivan tyylin. Tärkeintä on, että olet tyytyväinen lopputulokseen."
  },
  {
    question: "Millaisia hiustenleikkauksia tarjoatte miehille?",
    answer: "Tarjoamme monipuolisia miesten hiustenleikkauksia erilaisiin tyyleihin ja tarpeisiin. Voit valita klassisen hiusmallin, modernin tyylin tai lyhyen ja siistin leikkauksen. Kuuntelemme aina asiakkaan toiveita ja pyrimme toteuttamaan halutun lopputuloksen."
  },
  {
    question: "Teettekö Fade- ja Taper-leikkauksia?",
    answer: "Kyllä! Erilaiset häivytysleikkaukset ovat suosittuja miesten hiustyylejä. Voimme toteuttaa esimerkiksi Fade- ja Taper-tyylejä asiakkaan toiveiden mukaan. Voit myös näyttää meille kuvan haluamastasi mallista, jotta lopputulos vastaa paremmin odotuksiasi."
  },
  {
    question: "Voinko näyttää kuvan haluamastani hiusmallista?",
    answer: "Totta kai! Voit näyttää meille puhelimestasi kuvan hiusmallista, jonka haluaisit. Kuva auttaa meitä ymmärtämään paremmin toiveitasi ja haluamaasi tyyliä. Keskustelemme tarvittaessa myös siitä, miten kyseinen malli sopii hiuksiisi."
  },
  {
    question: " Leikkaatteko myös pitkät miesten hiukset?",
    answer: "Kyllä! Palvelemme asiakkaita erilaisilla hiusten pituuksilla. Voimme lyhentää hiuksia, siistiä latvoja tai muotoilla hiukset haluamallasi tavalla. Kerro meille, millaista lopputulosta tavoittelet."
  },
  {
    question: "Voinko pyytää vain sivujen ja niskan siistimistä?",
    answer: "Kyllä! Hiustenleikkauksen ei aina tarvitse tarkoittaa suurta muutosta. Voit pyytää esimerkiksi sivujen ja niskan siistimistä tai muuten vain hiusten muotoilua. Kerro meille toiveesi ennen leikkausta."
  },
  {
    question: "Kuinka usein miesten hiukset kannattaa leikata?",
    answer: "Hiustenleikkausväli riippuu omasta hiustyylistäsi ja siitä, kuinka nopeasti hiuksesi kasvavat. Lyhyet ja tarkasti muotoillut hiukset tarvitsevat usein säännöllisempää siistimistä. Autamme mielellämme löytämään sinulle sopivan leikkausvälin."
  },
  {
    question: "Autatteko sopivan hiusmallin valinnassa?",
    answer: "Kyllä! Autamme mielellämme löytämään hiusmallin, joka sopii kasvojesi muotoon, hiustesi rakenteeseen ja omaan tyyliisi. Voimme keskustella eri vaihtoehdoista ennen leikkauksen aloittamista. Haluamme, että tunnet olosi hyväksi uudessa hiustyylissäsi."
  },
  {
    question: "Voinko tulla lapsen kanssa hiustenleikkaukseen?",
    answer: "Kyllä! Myös lapset ovat tervetulleita hiustenleikkaukseen. Haluamme tarjota ystävällisen ja mukavan palvelukokemuksen kaikenikäisille asiakkaille. Vanhempi voi tarvittaessa olla mukana leikkauksen aikana."
  },
  {
    question: "Leikkaatteko myös nuorten hiuksia?",
    answer: "Kyllä! Palvelemme myös nuoria asiakkaita, jotka haluavat päivittää hiustyyliään tai pitää nykyisen mallinsa siistinä. Voit näyttää meille inspiraatiokuvan tai kertoa, millaisen tyylin haluaisit."
  },
  {
    question: "Mitä jos en ole varma, kuinka lyhyeksi haluan hiukseni?",
    answer: "Ei hätää! Autamme mielellämme löytämään sinulle sopivan hiustenleikkausversion. Kerro meille toiveesi, ja voimme keskustella eri vaihtoehdoista ennen leikkauksen aloittamista.Ei hätää! Voimme keskustella ennen leikkausta siitä, kuinka paljon hiuksia kannattaa lyhentää. On aina parempi edetä rauhallisesti ja varmistaa, että ymmärrämme toiveesi oikein. Näin voimme välttää liian suuren muutoksen."
  },
  {
    question: "Mistä löydän hiustenleikkausten hinnat?",
    answer: "Kaikkien palveluidemme hinnat löydät kotisivujemme Hinnasto-osiosta. Haluamme pitää hinnoittelun selkeänä, jotta tiedät jo etukäteen, mitä palvelu maksaa. Jos jokin hinta mietityttää, voit aina kysyä meiltä lisätietoja."
  },
  {
    question: "Sisältyykö hiustenmuotoilu hiustenleikkauksen hintaan?",
    answer: "Palvelun sisältö riippuu valitsemastasi hiustenleikkauksesta. Kerromme mielellämme, mitä palveluun kuuluu ja mitä eri vaihtoehtoja on tarjolla. Voit kysyä hinnasta ja palvelun sisällöstä ennen leikkauksen aloittamista."
  },
  {
    question: "Mitä maksutapoja hyväksytte?",
    answer: "Haluamme tehdä asioinnista mahdollisimman helppoa. Hyväksymämme maksutavat voit tarkistaa liikkeessämme. Jos haluat varmistaa maksutavan ennen saapumistasi, voit ottaa meihin yhteyttä."
  },
  {
    question: "Missä parturiliikkeenne sijaitsee",
    answer: "Löydät liikkeemme tarkan osoitteen kotisivujemme Yhteystiedot-osiosta. Sieltä löydät myös mahdolliset karttaohjeet, joiden avulla pääset helposti perille. Olet lämpimästi tervetullut tutustumaan liikkeeseemme!"
  },
  {
    question: " Mitkä ovat liikkeenne aukioloajat?",
    answer: "Aukioloaikamme löydät kotisivujemme Yhteystiedot-osiosta. Suosittelemme tarkistamaan aukioloajat ennen liikkeeseen saapumista, jotta voit suunnitella käyntisi helposti. Palvelemme asiakkaita ilmoitettuina aukioloaikoina."
  },
  {
    question: "Miten voin ottaa teihin yhteyttä?",
    answer: "Voit ottaa meihin yhteyttä kotisivuiltamme löytyvien yhteystietojen kautta. Autamme mielellämme palveluihin, hintoihin ja muihin kysymyksiin liittyvissä asioissa. Voit kysyä meiltä myös silloin, kun et ole varma, mikä palvelu sopii sinulle parhaiten."
  },
]

const FrequentlyQuestion = () => {

  const [openIndex, setOpenIndex] = React.useState(null);

  return (
    <div>
      <Information />
      <HeaderText />
      <HolyDay />
      <Header />

      {/* F&Q Header */}
      <div className='flex flex-col items-center justify-center text-center gap-3.5 mt-10 mb-12 px-5 md:px-10 lg:px-14'>
        <h3 className='text-[20px] md:text-[24px] lg:text-[20px] font-semibold text-gray-800'>Usein kysyttyä</h3>
        <p className='text-[15px] md:text-[18px] lg:text-[16px] text-black font-medium'>
          Haluamme tehdä asioinnistasi mahdollisimman helppoa ja sujuvaa. Tälle sivulle olemme koonneet vastauksia yleisimpiin kysymyksiin parturipalveluistamme, hiustenleikkauksista, hinnoista ja asioinnista liikkeessämme.
        </p>
        <p className='text-[15px] md:text-[18px] lg:text-[16px] text-black font-medium'>
          Tutustu alla oleviin kysymyksiin ja löydä helposti tarvitsemasi tiedot. Jos et löydä etsimääsi vastausta tai haluat kysyä jotain lisää, voit aina ottaa meihin yhteyttä. Autamme mielellämme ja vastaamme kysymyksiisi.
        </p>
        <p className='text-[15px] md:text-[18px] lg:text-[16px] text-black font-medium'>
          Meille jokainen asiakas on tärkeä. Tavoitteenamme on tarjota laadukasta palvelua, huolellista työnjälkeä ja mukava kokemus jokaisella parturikäynnillä. Tervetuloa asiakkaaksemme!
        </p>
      </div>

      {/* F&Q Content */}
      <div className='flex flex-col px-2 md:px-6 lg:px-10 w-full mb-16'>
        {frequentlyQuestions.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className='flex flex-col w-full gap-3.5 mb-5 px-2 md:px-4 lg:px-6 border rounded border border-[#d4dae3] py-3 text-[#071935] bg-white shadow'>
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className='flex justify-between text-start items-center w-full'>
                <h3 className='text-[15px] md:text-[17px] lg:text-[18px] font-semibold'>{item.question}</h3>
                <span className='text-[15px] md:text-[20px] lg:text-[22px]  ml-2 cursor-pointer'>
                  {isOpen ? <FaMinus /> : <FaPlus />}
                </span>
              </button>
              
                {isOpen && (
                  <p className='text-[14px] md:text-[17px] lg:text-[20px]'>{item.answer}</p>
                )

                }
              
            </div>
          )
        })
        }
      </div>
      <Map />
      <Footer />

    </div>
  )
}

export default FrequentlyQuestion