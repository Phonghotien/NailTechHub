import MobileModule from "./module/MobileModule.js";
import AosModule from "./module/AosModule.js";
import BtnToTopModule from "./module/BtnToTopModule.js";
import PopupModule from "./module/PopupModule.js";
import SwiperModule from "./module/SwiperModule.js";
import CountUpModule from "./module/CountUpModule.js";
import LoadModule from "./module/LoadModule.js";
import SelectCusModule from "./module/SelectCusModule.js";
import CheckModule from "./module/CheckModule.js";
import SearchModule from "./module/SearchModule.js";
import Select2Module from "./module/Select2Module.js";
import GalleryModule from "./module/GalleryModule.js";
import TabModule from "./module/TabModule.js";
import IsotopeModule from "./module/IsotopeModule.js";
import HeaderModule from "./module/HeaderModule.js";
import PlusMinusModule from "./module/PlusMinusModule.js";
import SideModule from "./module/SideModule.js";
import ShowHideModule from "./module/ShowHideModule.js";
import CollapseModule from "./module/CollapseModule.js";
import AnimatedModule from "./module/AnimatedModule.js";
import TextAniModule from "./module/TextAniModule.js";
import ScrollTriggerModule from "./module/ScrollTriggerModule.js";
import LoadMoreModule from "./module/LoadMoreModule.js";
import FileModule from "./module/FileModule.js";
import DatePickerModule from "./module/DatePickerModule.js";
import GsapModule from "./module/GsapModule.js";
import CountDownModule from "./module/CountDownModule.js";
import RangeModule from "./module/RangeModule.js";
import ChartModule from "./module/ChartModule.js";
import QuhuModule from "./module/QuhuModule.js";
import WizardModule from "./module/WizardModule.js";

window.addEventListener("DOMContentLoaded", () => {
  // Animation
  TextAniModule();
  AnimatedModule();

  AosModule();
  GsapModule();
  // Loadmore
  LoadModule();
  LoadMoreModule();
  ShowHideModule();
  // Tab
  TabModule();
  IsotopeModule();
  // Upload File
  FileModule();
  // DateTime
  DatePickerModule();
  // PlusMinus
  PlusMinusModule();
  // Select
  SelectCusModule();
  Select2Module();
  // CountUP
  CountUpModule();
  // Component
  SwiperModule();
  MobileModule();
  BtnToTopModule();
  HeaderModule();
  PopupModule();

  GalleryModule();
  SearchModule();
  SideModule();
  CollapseModule();

  CountDownModule();
  RangeModule();
  ScrollTriggerModule();
  ChartModule();
  QuhuModule();
  WizardModule();
  CheckModule();
});
