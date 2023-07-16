<template>
  <CustomSelect class="custom-input-country"
    :class="{
      focus,
      'label-enabled': showLabel,
    }"
    :clearable="clearable"
    :closeOnSelect="closeOnSelect"
    :create="true"
    :disabled="disabled"
    :options="options"
    :placeholder="placeholder"
    :regexp="/^[0-9]+$/"
    :searchable="searchable"
    :searchValue="input"
    :template="template"
    type="dropdown"
    :useDefaultCss="useDefaultCss"
    v-model="model"
    @close="close"
    @input="onInput"
    @open="open"
    @option:created="onOptionCreated"
    @option:selecting="onOptionSelecting"
    @option:deselecting="onOptionDeselecting"
    @option:selected="onOptionSelected"
    @option:deselected="onOptionDeselected"
    @search="search"
    @update:search="onSearchUpdate">
    <template v-slot:option="option">
      <div class="dropdown-option">
        <img :alt="`${ option.label } icon`"
          :src="option.svg" />

        <span>
          <template v-if="option.id">
            <b>{{ option.label }}</b> (+{{ option.code }})
          </template>

          <template v-else>
            +{{ option.code }}
          </template>
        </span>
      </div>
    </template>

    <template v-slot:selected-option>
      <img :alt="`${ model.label } icon`"
        :src="model.svg" />

      <span>
        <template v-if="model.id">
          <b>{{ model.label }}</b> (+{{ model.code }})
        </template>

        <template v-else>
          {{ model.code }}
        </template>
      </span>
    </template>

    <template v-slot:search="{ attributes, events, }">
      <img v-if="showLabel || !focus"
        alt="Icono no definido"
        :src="template.svg" />

      <input class="vs__search"
        :class="{
          placeholder: !model && !focus,
        }"
        :placeholder="text"
        v-bind="attributes"
        v-model="input"
        v-on="events"
        @focus="onSearchFocus"
        @blur="onSearchBlur" />
    </template>
  </CustomSelect>
</template>

<script>
  import CustomSelect from "./Select.vue";
  import AD from "./flags/AD.svg";
  import AE from "./flags/AE.svg";
  import AF from "./flags/AF.svg";
  import AG from "./flags/AG.svg";
  import AI from "./flags/AI.svg";
  import AL from "./flags/AL.svg";
  import AM from "./flags/AM.svg";
  import AO from "./flags/AO.svg";
  import AQ from "./flags/AQ.svg";
  import AR from "./flags/AR.svg";
  import AS from "./flags/AS.svg";
  import AT from "./flags/AT.svg";
  import AU from "./flags/AU.svg";
  import AW from "./flags/AW.svg";
  import AZ from "./flags/AZ.svg";
  import BA from "./flags/BA.svg";
  import BB from "./flags/BB.svg";
  import BD from "./flags/BD.svg";
  import BE from "./flags/BE.svg";
  import BF from "./flags/BF.svg";
  import BG from "./flags/BG.svg";
  import BH from "./flags/BH.svg";
  import BI from "./flags/BI.svg";
  import BJ from "./flags/BJ.svg";
  import BM from "./flags/BM.svg";
  import BN from "./flags/BN.svg";
  import BO from "./flags/BO.svg";
  import BR from "./flags/BR.svg";
  import BS from "./flags/BS.svg";
  import BT from "./flags/BT.svg";
  import BW from "./flags/BW.svg";
  import BY from "./flags/BY.svg";
  import BZ from "./flags/BZ.svg";
  import CA from "./flags/CA.svg";
  import CD from "./flags/CD.svg";
  import CF from "./flags/CF.svg";
  import CG from "./flags/CG.svg";
  import CH from "./flags/CH.svg";
  import CI from "./flags/CI.svg";
  import CK from "./flags/CK.svg";
  import CL from "./flags/CL.svg";
  import CM from "./flags/CM.svg";
  import CN from "./flags/CN.svg";
  import CO from "./flags/CO.svg";
  import CR from "./flags/CR.svg";
  import CU from "./flags/CU.svg";
  import CV from "./flags/CV.svg";
  import CY from "./flags/CY.svg";
  import CZ from "./flags/CZ.svg";
  import DE from "./flags/DE.svg";
  import DJ from "./flags/DJ.svg";
  import DK from "./flags/DK.svg";
  import DM from "./flags/DM.svg";
  import DO from "./flags/DO.svg";
  import DZ from "./flags/DZ.svg";
  import EC from "./flags/EC.svg";
  import EE from "./flags/EE.svg";
  import EG from "./flags/EG.svg";
  import ER from "./flags/ER.svg";
  import ET from "./flags/ET.svg";
  import FI from "./flags/FI.svg";
  import FJ from "./flags/FJ.svg";
  import FK from "./flags/FK.svg";
  import FM from "./flags/FM.svg";
  import FO from "./flags/FO.svg";
  import FR from "./flags/FR.svg";
  import GA from "./flags/GA.svg";
  import GD from "./flags/GD.svg";
  import GE from "./flags/GE.svg";
  import GF from "./flags/GF.svg";
  import GH from "./flags/GH.svg";
  import GI from "./flags/GI.svg";
  import GL from "./flags/GL.svg";
  import GM from "./flags/GM.svg";
  import GN from "./flags/GN.svg";
  import GQ from "./flags/GQ.svg";
  import GR from "./flags/GR.svg";
  import GT from "./flags/GT.svg";
  import GU from "./flags/GU.svg";
  import GW from "./flags/GW.svg";
  import GY from "./flags/GY.svg";
  import HN from "./flags/HN.svg";
  import HR from "./flags/HR.svg";
  import HT from "./flags/HT.svg";
  import HU from "./flags/HU.svg";
  import ID from "./flags/ID.svg";
  import IE from "./flags/IE.svg";
  import IL from "./flags/IL.svg";
  import IN from "./flags/IN.svg";
  import IQ from "./flags/IQ.svg";
  import IR from "./flags/IR.svg";
  import IS from "./flags/IS.svg";
  import IT from "./flags/IT.svg";
  import JM from "./flags/JM.svg";
  import JO from "./flags/JO.svg";
  import JP from "./flags/JP.svg";
  import KE from "./flags/KE.svg";
  import KG from "./flags/KG.svg";
  import KH from "./flags/KH.svg";
  import KI from "./flags/KI.svg";
  import KM from "./flags/KM.svg";
  import KN from "./flags/KN.svg";
  import KP from "./flags/KP.svg";
  import KR from "./flags/KR.svg";
  import KW from "./flags/KW.svg";
  import KY from "./flags/KY.svg";
  import KZ from "./flags/KZ.svg";
  import LA from "./flags/LA.svg";
  import LB from "./flags/LB.svg";
  import LC from "./flags/LC.svg";
  import LI from "./flags/LI.svg";
  import LK from "./flags/LK.svg";
  import LR from "./flags/LR.svg";
  import LS from "./flags/LS.svg";
  import LT from "./flags/LT.svg";
  import LU from "./flags/LU.svg";
  import LV from "./flags/LV.svg";
  import LY from "./flags/LY.svg";
  import MA from "./flags/MA.svg";
  import MC from "./flags/MC.svg";
  import MD from "./flags/MD.svg";
  import MG from "./flags/MG.svg";
  import MH from "./flags/MH.svg";
  import MK from "./flags/MK.svg";
  import ML from "./flags/ML.svg";
  import MM from "./flags/MM.svg";
  import MN from "./flags/MN.svg";
  import MP from "./flags/MP.svg";
  import MQ from "./flags/MQ.svg";
  import MR from "./flags/MR.svg";
  import MS from "./flags/MS.svg";
  import MT from "./flags/MT.svg";
  import MU from "./flags/MU.svg";
  import MV from "./flags/MV.svg";
  import MW from "./flags/MW.svg";
  import MX from "./flags/MX.svg";
  import MY from "./flags/MY.svg";
  import MZ from "./flags/MZ.svg";
  import NA from "./flags/NA.svg";
  import NC from "./flags/NC.svg";
  import NE from "./flags/NE.svg";
  import NF from "./flags/NF.svg";
  import NG from "./flags/NG.svg";
  import NI from "./flags/NI.svg";
  import NL from "./flags/NL.svg";
  import NN from "./flags/NN.svg";
  import NO from "./flags/NO.svg";
  import NP from "./flags/NP.svg";
  import NR from "./flags/NR.svg";
  import NU from "./flags/NU.svg";
  import NZ from "./flags/NZ.svg";
  import OM from "./flags/OM.svg";
  import PA from "./flags/PA.svg";
  import PE from "./flags/PE.svg";
  import PF from "./flags/PF.svg";
  import PG from "./flags/PG.svg";
  import PH from "./flags/PH.svg";
  import PK from "./flags/PK.svg";
  import PL from "./flags/PL.svg";
  import PT from "./flags/PT.svg";
  import PW from "./flags/PW.svg";
  import PY from "./flags/PY.svg";
  import QA from "./flags/QA.svg";
  import RE from "./flags/RE.svg";
  import RO from "./flags/RO.svg";
  import RU from "./flags/RU.svg";
  import RW from "./flags/RW.svg";
  import SA from "./flags/SA.svg";
  import SB from "./flags/SB.svg";
  import SC from "./flags/SC.svg";
  import SD from "./flags/SD.svg";
  import SE from "./flags/SE.svg";
  import SG from "./flags/SG.svg";
  import SH from "./flags/SH.svg";
  import SI from "./flags/SI.svg";
  import SK from "./flags/SK.svg";
  import SL from "./flags/SL.svg";
  import SM from "./flags/SM.svg";
  import SN from "./flags/SN.svg";
  import SO from "./flags/SO.svg";
  import SR from "./flags/SR.svg";
  import ST from "./flags/ST.svg";
  import SV from "./flags/SV.svg";
  import SY from "./flags/SY.svg";
  import SZ from "./flags/SZ.svg";
  import TC from "./flags/TC.svg";
  import TD from "./flags/TD.svg";
  import TG from "./flags/TG.svg";
  import TH from "./flags/TH.svg";
  import TJ from "./flags/TJ.svg";
  import TK from "./flags/TK.svg";
  import TM from "./flags/TM.svg";
  import TN from "./flags/TN.svg";
  import TO from "./flags/TO.svg";
  import TR from "./flags/TR.svg";
  import TT from "./flags/TT.svg";
  import TV from "./flags/TV.svg";
  import TW from "./flags/TW.svg";
  import TZ from "./flags/TZ.svg";
  import UA from "./flags/UA.svg";
  import UG from "./flags/UG.svg";
  import UK from "./flags/UK.svg";
  import US from "./flags/US.svg";
  import UY from "./flags/UY.svg";
  import UZ from "./flags/UZ.svg";
  import VA from "./flags/VA.svg";
  import VC from "./flags/VC.svg";
  import VE from "./flags/VE.svg";
  import VG from "./flags/VG.svg";
  import VI from "./flags/VI.svg";
  import VN from "./flags/VN.svg";
  import VU from "./flags/VU.svg";
  import WF from "./flags/WF.svg";
  import WS from "./flags/WS.svg";
  import YE from "./flags/YE.svg";
  import ZA from "./flags/ZA.svg";
  import ZM from "./flags/ZM.svg";
  import ZW from "./flags/ZW.svg";

  export default {
    name: "Country",
    components: {
      CustomSelect,
    },
    props: {
      clearable: {
        default: false,
        required: false,
      },
      closeOnSelect: {
        default: true,
        required: false,
      },
      disabled: {
        default: false,
        required: false,
      },
      placeholder: {
        default: 'Código de país',
        required: false,
      },
      searchable: {
        default: true,
        required: false,
      },
      showLabel: {
        default: false,
        required: false,
      },
      useDefaultCss: {
        default: true,
        required: false,
      },
      value: {
        default: null,
        required: false,
      },
    },
    model: {
      event: 'update',
      prop: 'value',
    },
    data () {
      return {
        ARGENTINA_ID: 1,
        focus: false,
        model: this.value,
        options: [
          { code: "54", id: "AR", label: "Argentina", svg: AR, tier: 2, },
          { code: "598", id: "UY", label: "Uruguay", svg: UY, tier: 2, },
          { code: "93", id: "AF", label: "Afganistán", svg: AF, tier: 1, },
          { code: "355", id: "AL", label: "Albania", svg: AL, tier: 1, },
          { code: "49", id: "DE", label: "Alemania", svg: DE, tier: 1, },
          { code: "376", id: "AD", label: "Andorra", svg: AD, tier: 1, },
          { code: "244", id: "AO", label: "Angola", svg: AO, tier: 1, },
          { code: "1", id: "AI", label: "Anguilla", svg: AI, tier: 1, },
          { code: "1", id: "AG", label: "Antigua y Barbuda", svg: AG, tier: 1, },
          { code: "672", id: "AQ", label: "Antártida", svg: AQ, tier: 1, },
          { code: "966", id: "SA", label: "Arabia Saudí", svg: SA, tier: 1, },
          { code: "213", id: "DZ", label: "Argelia", svg: DZ, tier: 1, },
          { code: "374", id: "AM", label: "Armenia", svg: AM, tier: 1, },
          { code: "297", id: "AW", label: "Aruba", svg: AW, tier: 1, },
          { code: "61", id: "AU", label: "Australia", svg: AU, tier: 1, },
          { code: "43", id: "AT", label: "Austria", svg: AT, tier: 1, },
          { code: "994", id: "AZ", label: "Azerbaiyán", svg: AZ, tier: 1, },
          { code: "1", id: "BS", label: "Bahamas", svg: BS, tier: 1, },
          { code: "973", id: "BH", label: "Bahrein", svg: BH, tier: 1, },
          { code: "880", id: "BD", label: "Bangladesh", svg: BD, tier: 1, },
          { code: "1", id: "BB", label: "Barbados", svg: BB, tier: 1, },
          { code: "501", id: "BZ", label: "Belice", svg: BZ, tier: 1, },
          { code: "229", id: "BJ", label: "Benin", svg: BJ, tier: 1, },
          { code: "1", id: "BM", label: "Bermudas", svg: BM, tier: 1, },
          { code: "375", id: "BY", label: "Bielorrusia", svg: BY, tier: 1, },
          { code: "95", id: "MM", label: "Birmania", svg: MM, tier: 1, },
          { code: "591", id: "BO", label: "Bolivia", svg: BO, tier: 1, },
          { code: "387", id: "BA", label: "Bosnia y Herzegovina", svg: BA, tier: 1, },
          { code: "267", id: "BW", label: "Botswana", svg: BW, tier: 1, },
          { code: "55", id: "BR", label: "Brasil", svg: BR, tier: 1, },
          { code: "673", id: "BN", label: "Brunei", svg: BN, tier: 1, },
          { code: "359", id: "BG", label: "Bulgaria", svg: BG, tier: 1, },
          { code: "226", id: "BF", label: "Burkina Faso", svg: BF, tier: 1, },
          { code: "257", id: "BI", label: "Burundi", svg: BI, tier: 1, },
          { code: "975", id: "BT", label: "Bután", svg: BT, tier: 1, },
          { code: "32", id: "BE", label: "Bélgica", svg: BE, tier: 1, },
          { code: "238", id: "CV", label: "Cabo Verde", svg: CV, tier: 1, },
          { code: "855", id: "KH", label: "Camboya", svg: KH, tier: 1, },
          { code: "237", id: "CM", label: "Camerún", svg: CM, tier: 1, },
          { code: "1", id: "CA", label: "Canadá", svg: CA, tier: 1, },
          { code: "235", id: "TD", label: "Chad", svg: TD, tier: 1, },
          { code: "56", id: "CL", label: "Chile", svg: CL, tier: 1, },
          { code: "86", id: "CN", label: "China", svg: CN, tier: 1, },
          { code: "357", id: "CY", label: "Chipre", svg: CY, tier: 1, },
          { code: "39", id: "VA", label: "Ciudad del Vaticano (Santa Sede)", svg: VA, tier: 1, },
          { code: "57", id: "CO", label: "Colombia", svg: CO, tier: 1, },
          { code: "269", id: "KM", label: "Comores", svg: KM, tier: 1, },
          { code: "242", id: "CG", label: "Congo", svg: CG, tier: 1, },
          { code: "243", id: "CD", label: "Congo, República Democrática del", svg: CD, tier: 1, },
          { code: "82", id: "KR", label: "Corea", svg: KR, tier: 1, },
          { code: "850", id: "KP", label: "Corea del Norte", svg: KP, tier: 1, },
          { code: "506", id: "CR", label: "Costa Rica", svg: CR, tier: 1, },
          { code: "225", id: "CI", label: "Costa de Marfíl", svg: CI, tier: 1, },
          { code: "385", id: "HR", label: "Croacia (Hrvatska)", svg: HR, tier: 1, },
          { code: "53", id: "CU", label: "Cuba", svg: CU, tier: 1, },
          { code: "45", id: "DK", label: "Dinamarca", svg: DK, tier: 1, },
          { code: "253", id: "DJ", label: "Djibouti", svg: DJ, tier: 1, },
          { code: "1", id: "DM", label: "Dominica", svg: DM, tier: 1, },
          { code: "593", id: "EC", label: "Ecuador", svg: EC, tier: 1, },
          { code: "20", id: "EG", label: "Egipto", svg: EG, tier: 1, },
          { code: "503", id: "SV", label: "El Salvador", svg: SV, tier: 1, },
          { code: "971", id: "AE", label: "Emiratos Árabes Unidos", svg: AE, tier: 1, },
          { code: "291", id: "ER", label: "Eritrea", svg: ER, tier: 1, },
          { code: "386", id: "SI", label: "Eslovenia", svg: SI, tier: 1, },
          { code: "1", id: "US", label: "Estados Unidos", svg: US, tier: 1, },
          { code: "372", id: "EE", label: "Estonia", svg: EE, tier: 1, },
          { code: "251", id: "ET", label: "Etiopía", svg: ET, tier: 1, },
          { code: "679", id: "FJ", label: "Fiji", svg: FJ, tier: 1, },
          { code: "63", id: "PH", label: "Filipinas", svg: PH, tier: 1, },
          { code: "358", id: "FI", label: "Finlandia", svg: FI, tier: 1, },
          { code: "590", id: "FR", label: "Francia", svg: FR, tier: 1, },
          { code: "241", id: "GA", label: "Gabón", svg: GA, tier: 1, },
          { code: "220", id: "GM", label: "Gambia", svg: GM, tier: 1, },
          { code: "995", id: "GE", label: "Georgia", svg: GE, tier: 1, },
          { code: "233", id: "GH", label: "Ghana", svg: GH, tier: 1, },
          { code: "350", id: "GI", label: "Gibraltar", svg: GI, tier: 1, },
          { code: "1", id: "GD", label: "Granada", svg: GD, tier: 1, },
          { code: "30", id: "GR", label: "Grecia", svg: GR, tier: 1, },
          { code: "299", id: "GL", label: "Groenlandia", svg: GL, tier: 1, },
          { code: "1", id: "GU", label: "Guam", svg: GU, tier: 1, },
          { code: "502", id: "GT", label: "Guatemala", svg: GT, tier: 1, },
          { code: "592", id: "GY", label: "Guayana", svg: GY, tier: 1, },
          { code: "594", id: "GF", label: "Guayana Francesa", svg: GF, tier: 1, },
          { code: "224", id: "GN", label: "Guinea", svg: GN, tier: 1, },
          { code: "240", id: "GQ", label: "Guinea Ecuatorial", svg: GQ, tier: 1, },
          { code: "245", id: "GW", label: "Guinea-Bissau", svg: GW, tier: 1, },
          { code: "509", id: "HT", label: "Haití", svg: HT, tier: 1, },
          { code: "504", id: "HN", label: "Honduras", svg: HN, tier: 1, },
          { code: "36", id: "HU", label: "Hungría", svg: HU, tier: 1, },
          { code: "91", id: "IN", label: "India", svg: IN, tier: 1, },
          { code: "62", id: "ID", label: "Indonesia", svg: ID, tier: 1, },
          { code: "964", id: "IQ", label: "Irak", svg: IQ, tier: 1, },
          { code: "353", id: "IE", label: "Irlanda", svg: IE, tier: 1, },
          { code: "98", id: "IR", label: "Irán", svg: IR, tier: 1, },
          { code: "354", id: "IS", label: "Islandia", svg: IS, tier: 1, },
          { code: "1", id: "KY", label: "Islas Caimán", svg: KY, tier: 1, },
          { code: "682", id: "CK", label: "Islas Cook", svg: CK, tier: 1, },
          { code: "298", id: "FO", label: "Islas Faroe", svg: FO, tier: 1, },
          { code: "500", id: "FK", label: "Islas Malvinas", svg: FK, tier: 1, },
          { code: "1", id: "MP", label: "Islas Marianas del Norte", svg: MP, tier: 1, },
          { code: "692", id: "MH", label: "Islas Marshall", svg: MH, tier: 1, },
          { code: "680", id: "PW", label: "Islas Palau", svg: PW, tier: 1, },
          { code: "677", id: "SB", label: "Islas Salomón", svg: SB, tier: 1, },
          { code: "690", id: "TK", label: "Islas Tokelau", svg: TK, tier: 1, },
          { code: "1", id: "TC", label: "Islas Turks y Caicos", svg: TC, tier: 1, },
          { code: "1", id: "VI", label: "Islas Vírgenes (EEUU)", svg: VI, tier: 1, },
          { code: "1", id: "VG", label: "Islas Vírgenes (Reino Unido)", svg: VG, tier: 1, },
          { code: "681", id: "WF", label: "Islas Wallis y Futuna", svg: WF, tier: 1, },
          { code: "972", id: "IL", label: "Israel", svg: IL, tier: 1, },
          { code: "39", id: "IT", label: "Italia", svg: IT, tier: 1, },
          { code: "1", id: "JM", label: "Jamaica", svg: JM, tier: 1, },
          { code: "81", id: "JP", label: "Japón", svg: JP, tier: 1, },
          { code: "962", id: "JO", label: "Jordania", svg: JO, tier: 1, },
          { code: "7", id: "KZ", label: "Kazajistán", svg: KZ, tier: 1, },
          { code: "254", id: "KE", label: "Kenia", svg: KE, tier: 1, },
          { code: "996", id: "KG", label: "Kirguizistán", svg: KG, tier: 1, },
          { code: "686", id: "KI", label: "Kiribati", svg: KI, tier: 1, },
          { code: "965", id: "KW", label: "Kuwait", svg: KW, tier: 1, },
          { code: "856", id: "LA", label: "Laos", svg: LA, tier: 1, },
          { code: "266", id: "LS", label: "Lesotho", svg: LS, tier: 1, },
          { code: "371", id: "LV", label: "Letonia", svg: LV, tier: 1, },
          { code: "231", id: "LR", label: "Liberia", svg: LR, tier: 1, },
          { code: "218", id: "LY", label: "Libia", svg: LY, tier: 1, },
          { code: "423", id: "LI", label: "Liechtenstein", svg: LI, tier: 1, },
          { code: "370", id: "LT", label: "Lituania", svg: LT, tier: 1, },
          { code: "352", id: "LU", label: "Luxemburgo", svg: LU, tier: 1, },
          { code: "961", id: "LB", label: "Líbano", svg: LB, tier: 1, },
          { code: "389", id: "MK", label: "Macedonia", svg: MK, tier: 1, },
          { code: "261", id: "MG", label: "Madagascar", svg: MG, tier: 1, },
          { code: "60", id: "MY", label: "Malasia", svg: MY, tier: 1, },
          { code: "265", id: "MW", label: "Malawi", svg: MW, tier: 1, },
          { code: "960", id: "MV", label: "Maldivas", svg: MV, tier: 1, },
          { code: "356", id: "MT", label: "Malta", svg: MT, tier: 1, },
          { code: "223", id: "ML", label: "Malí", svg: ML, tier: 1, },
          { code: "212", id: "MA", label: "Marruecos", svg: MA, tier: 1, },
          { code: "596", id: "MQ", label: "Martinica", svg: MQ, tier: 1, },
          { code: "230", id: "MU", label: "Mauricio", svg: MU, tier: 1, },
          { code: "222", id: "MR", label: "Mauritania", svg: MR, tier: 1, },
          { code: "691", id: "FM", label: "Micronesia", svg: FM, tier: 1, },
          { code: "373", id: "MD", label: "Moldavia", svg: MD, tier: 1, },
          { code: "976", id: "MN", label: "Mongolia", svg: MN, tier: 1, },
          { code: "1", id: "MS", label: "Montserrat", svg: MS, tier: 1, },
          { code: "258", id: "MZ", label: "Mozambique", svg: MZ, tier: 1, },
          { code: "52", id: "MX", label: "México", svg: MX, tier: 1, },
          { code: "377", id: "MC", label: "Mónaco", svg: MC, tier: 1, },
          { code: "264", id: "NA", label: "Namibia", svg: NA, tier: 1, },
          { code: "674", id: "NR", label: "Nauru", svg: NR, tier: 1, },
          { code: "977", id: "NP", label: "Nepal", svg: NP, tier: 1, },
          { code: "505", id: "NI", label: "Nicaragua", svg: NI, tier: 1, },
          { code: "234", id: "NG", label: "Nigeria", svg: NG, tier: 1, },
          { code: "683", id: "NU", label: "Niue", svg: NU, tier: 1, },
          { code: "672", id: "NF", label: "Norfolk", svg: NF, tier: 1, },
          { code: "47", id: "NO", label: "Noruega", svg: NO, tier: 1, },
          { code: "687", id: "NC", label: "Nueva Caledonia", svg: NC, tier: 1, },
          { code: "64", id: "NZ", label: "Nueva Zelanda", svg: NZ, tier: 1, },
          { code: "227", id: "NE", label: "Níger", svg: NE, tier: 1, },
          { code: "968", id: "OM", label: "Omán", svg: OM, tier: 1, },
          { code: "507", id: "PA", label: "Panamá", svg: PA, tier: 1, },
          { code: "675", id: "PG", label: "Papúa Nueva Guinea", svg: PG, tier: 1, },
          { code: "92", id: "PK", label: "Paquistán", svg: PK, tier: 1, },
          { code: "595", id: "PY", label: "Paraguay", svg: PY, tier: 1, },
          { code: "31", id: "NL", label: "Países Bajos", svg: NL, tier: 1, },
          { code: "51", id: "PE", label: "Perú", svg: PE, tier: 1, },
          { code: "689", id: "PF", label: "Polinesia Francesa", svg: PF, tier: 1, },
          { code: "48", id: "PL", label: "Polonia", svg: PL, tier: 1, },
          { code: "351", id: "PT", label: "Portugal", svg: PT, tier: 1, },
          { code: "974", id: "QA", label: "Qatar", svg: QA, tier: 1, },
          { code: "44", id: "UK", label: "Reino Unido", svg: UK, tier: 1, },
          { code: "236", id: "CF", label: "República Centroafricana", svg: CF, tier: 1, },
          { code: "420", id: "CZ", label: "República Checa", svg: CZ, tier: 1, },
          { code: "1", id: "DO", label: "República Dominicana", svg: DO, tier: 1, },
          { code: "421", id: "SK", label: "República Eslovaca", svg: SK, tier: 1, },
          { code: "27", id: "ZA", label: "República de Sudáfrica", svg: ZA, tier: 1, },
          { code: "262", id: "RE", label: "Reunión", svg: RE, tier: 1, },
          { code: "250", id: "RW", label: "Ruanda", svg: RW, tier: 1, },
          { code: "40", id: "RO", label: "Rumania", svg: RO, tier: 1, },
          { code: "7", id: "RU", label: "Rusia", svg: RU, tier: 1, },
          { code: "1", id: "KN", label: "Saint Kitts y Nevis", svg: KN, tier: 1, },
          { code: "685", id: "WS", label: "Samoa", svg: WS, tier: 1, },
          { code: "1", id: "AS", label: "Samoa Americana", svg: AS, tier: 1, },
          { code: "378", id: "SM", label: "San Marino", svg: SM, tier: 1, },
          { code: "1", id: "VC", label: "San Vicente y Granadinas", svg: VC, tier: 1, },
          { code: "290", id: "SH", label: "Santa Helena", svg: SH, tier: 1, },
          { code: "1", id: "LC", label: "Santa Lucía", svg: LC, tier: 1, },
          { code: "239", id: "ST", label: "Santo Tomé y Príncipe", svg: ST, tier: 1, },
          { code: "221", id: "SN", label: "Senegal", svg: SN, tier: 1, },
          { code: "248", id: "SC", label: "Seychelles", svg: SC, tier: 1, },
          { code: "232", id: "SL", label: "Sierra Leona", svg: SL, tier: 1, },
          { code: "65", id: "SG", label: "Singapur", svg: SG, tier: 1, },
          { code: "963", id: "SY", label: "Siria", svg: SY, tier: 1, },
          { code: "252", id: "SO", label: "Somalia", svg: SO, tier: 1, },
          { code: "94", id: "LK", label: "Sri Lanka", svg: LK, tier: 1, },
          { code: "268", id: "SZ", label: "Suazilandia", svg: SZ, tier: 1, },
          { code: "249", id: "SD", label: "Sudán", svg: SD, tier: 1, },
          { code: "46", id: "SE", label: "Suecia", svg: SE, tier: 1, },
          { code: "41", id: "CH", label: "Suiza", svg: CH, tier: 1, },
          { code: "597", id: "SR", label: "Surinam", svg: SR, tier: 1, },
          { code: "66", id: "TH", label: "Tailandia", svg: TH, tier: 1, },
          { code: "886", id: "TW", label: "Taiwán", svg: TW, tier: 1, },
          { code: "255", id: "TZ", label: "Tanzania", svg: TZ, tier: 1, },
          { code: "992", id: "TJ", label: "Tayikistán", svg: TJ, tier: 1, },
          { code: "228", id: "TG", label: "Togo", svg: TG, tier: 1, },
          { code: "676", id: "TO", label: "Tonga", svg: TO, tier: 1, },
          { code: "1", id: "TT", label: "Trinidad y Tobago", svg: TT, tier: 1, },
          { code: "993", id: "TM", label: "Turkmenistán", svg: TM, tier: 1, },
          { code: "90", id: "TR", label: "Turquía", svg: TR, tier: 1, },
          { code: "688", id: "TV", label: "Tuvalu", svg: TV, tier: 1, },
          { code: "216", id: "TN", label: "Túnez", svg: TN, tier: 1, },
          { code: "380", id: "UA", label: "Ucrania", svg: UA, tier: 1, },
          { code: "256", id: "UG", label: "Uganda", svg: UG, tier: 1, },
          { code: "998", id: "UZ", label: "Uzbekistán", svg: UZ, tier: 1, },
          { code: "678", id: "VU", label: "Vanuatu", svg: VU, tier: 1, },
          { code: "58", id: "VE", label: "Venezuela", svg: VE, tier: 1, },
          { code: "84", id: "VN", label: "Vietnam", svg: VN, tier: 1, },
          { code: "967", id: "YE", label: "Yemen", svg: YE, tier: 1, },
          { code: "260", id: "ZM", label: "Zambia", svg: ZM, tier: 1, },
          { code: "263", id: "ZW", label: "Zimbabue", svg: ZW, tier: 1, },
        ],
        input: null,
        pais,
        template: {
          svg: NN,
          tier: 3,
        },
        URUGUAY_ID: 2,
      };
    },
    computed: {
      text () {
        if (this.model) {
          if (this.showLabel && this.model.id)
            return `${ this.model.label } (+${ this.model.code })`;

          else
            return `${ this.model.code }`;
        }

        if (this.placeholder)
          return this.placeholder;

        return '';
      },
    },
    methods: {
      close () {
        this.$emit('close');
      },
      checkDefault () {
        if (!this.value)
          this.model = this.options
            .find(option => {
              switch (this.pais) {
                case this.ARGENTINA_ID:
                default:
                  return option.id == 'AR';

                case this.URUGUAY_ID:
                  return option.id == 'UY';
              }
            });

        else if (typeof this.model != 'object') {
          let model = this.options
            .find(option => option.code == this.model);

          if (!model)
            model = {
              ...this.template,
              code: this.model,
              label: this.model,
            };

          this.model = model;
        }
      },
      onInput (value) {
        this.$emit('input', value);
      },
      open () {
        this.$emit('open');
      },
      onOptionCreated (option) {
        this.$emit('option:created', option);
      },
      onOptionDeselected (option) {
        this.$emit('option:deselected', option);
      },
      onOptionDeselecting (option) {
        this.$emit('option:deselecting', option);
      },
      onOptionSelected (option) {
        this.$emit('option:selected', option);
      },
      onOptionSelecting (option) {
        this.$emit('option:selecting', option);
      },
      onSearchFocus () {
        this.focus = true;

        this.$emit('search:focus');
      },
      onSearchBlur () {
        this.focus = false;

        this.$emit('search:blur');
      },
      onSearchUpdate (value) {
        this.input = value;

        this.$emit('input', value);
      },
      search (input) {
        this.$emit('search', input);
      },
    },
    beforeMount () {
      this.checkDefault();
    },
    watch: {
      model () {
        this.$emit('update', this.model);
      },
      value () {
        this.model = this.value;

        this.checkDefault();
      },
    },
  };
</script>

<style lang="scss" scoped>
  .custom-input-country.custom-input {
    position: relative;

    .dropdown-option {
      display: flex;
      align-items: center;
      gap: 12px;
      white-space: nowrap;

      img {
        width: 24px;
        aspect-ratio: 4 / 3;
      }
    }

    &:not(.label-enabled) {
      width: 68px;

      &::v-deep {
        .dropdown-input {
          .vs__dropdown-toggle {
            .vs__selected-options {
              input {
                padding-left: 12px;
              }
            }
          }
        }
      }
    }

    &::v-deep {
      .dropdown-input {
        .vs__dropdown-toggle {
          .vs__selected-options {
            > img {
              position: absolute;
              width: 24px;
              aspect-ratio: 4 / 3;
              z-index: 1;
            }

            .vs__selected {
              display: flex;
              align-items: center;
              gap: 12px;
              white-space: nowrap;

              img {
                width: 24px;
                aspect-ratio: 4 / 3;
              }
            }

            input {
              padding-left: 48px;
            }
          }
        }

        &.vs--open {
          .vs__dropdown-toggle {
            .vs__selected-options {
              > img {
                &:not([readonly]) {
                  z-index: 4;
                }
              }
            }
          }
        }
      }
    }
  }
</style>