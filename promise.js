import Nuo from "nuo";

if (typeof Promise === "undefined") {
  window.Promise = Nuo;
}
