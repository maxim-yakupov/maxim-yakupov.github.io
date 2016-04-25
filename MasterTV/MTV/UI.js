((MasterTV) => {

function INIT(s) {
//     var s = this.tv.name;
	var body = document.getElementsByTagName("body")[0];
	body.innerHTML = `
<div class="mdl-layout--fixed-header mdl-layout mdl-js-layout">
  <header class="mdl-layout__header mdl-layout__header--fixed-header">
    <!-- Top row, always visible -->
    <div class="mdl-layout__header-row">
      <!-- Title -->
      <span class="mdl-layout-title">MasterTV</span>
      <div class="mdl-layout-spacer"></div>
      <button onclick="` + s + `.volumeSwitch()" name="tv` + s + `$volumeSwitcher"
          class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--fab mdl-button--colored mdl-shadow--2dp mdl-button--accent">
        <i class="material-icons"></i>
      </button>
	<div class="mdl-layout-spacer"></div>
      <button  onclick="` + s + `.powerSwitch()" name="tv` + s + `$powerSwitcher"
          class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--fab mdl-button--colored mdl-shadow--2dp mdl-button--accent">
	<i class="material-icons"></i>
      </button>
    </div>
  </header>
<div class="mdl-layout__drawer">
    <span class="mdl-layout-title">Channels</span>
    <nav name="tv` + s + `$channels-list" class="mdl-navigation">
    </nav>
  </div>
  <main class="mdl-layout__content">
    <div class="page-content">
    	<br/>
    	<input name="tv` + s + `$volumeSlider" onchange="` + s + `.changeVolumeLevel(this.value)" class="mdl-slider mdl-js-slider" type="range"
		  min="0" max="100" value="100" tabindex="0">
		<br/>
		<div name="tv` + s + `$channelInfoContainer">Loading...</div>
    </div>
  </main>
</div>
<div name="tv` + s + `$snackbar" class="mdl-js-snackbar mdl-snackbar" style="z-index: 99;">
  <div class="mdl-snackbar__text"></div>
  <button class="mdl-snackbar__action" type="button"></button>
</div>
	`;
	componentHandler.upgradeAllRegistered();
};

function createFor(tv) {
    return {
        "tv": tv,
        "INIT": () => { INIT(tv.name); },
        "getAll":
            function getAll(name) {
                return document.getElementsByName("tv" + this.tv.name + "$" + name);
            },
        "get": 
            function get(name, index) {
                return this.getAll(name)[index];
            },
        "showSnackbar":
            function showSnackbar(message, timeout, handler, buttonText) {
            'use strict';
                var data = {
                    message: message,
                    timeout: timeout,
                    actionHandler: handler,
                    actionText: buttonText
                };
                this.get("snackbar", 0).MaterialSnackbar.showSnackbar(data);
            },
        "updatePower":
            function updatePower() {
                this.get("powerSwitcher", 0).children[0].innerText = 
                    this.tv.isPowerOn ? "visibility_off" : "power_settings_new";
            },
        "updateVolume":
            function updateVolume() {
                this.get("volumeSwitcher", 0).children[0].innerText = 
                    this.tv.isVolumeOn ? "volume_off" : "volume_up";
                this.get("volumeSlider", 0).disabled = 
                    !this.tv.isVolumeOn;
            },
        "updateVolumeLevel":
            function updateVolumeLevel() {
                this.get("volumeSlider", 0).MaterialSlider.change(
                    this.tv.volumeLevel
                );
            },
        "updateChannelInfo":
            function updateChannelInfo() {
                var content = this.get("channelInfoContainer", 0);
                if (!this.tv.isPowerOn) {
                    content.innerHTML = "<h1>TV is turned off</h1>";
                    return;
                }
                if (this.tv.selectedChannelId == -1) {
                    content.innerHTML = "<h1>Channel not choosen</h1>";
                    return;
                }

                var channel = this.tv.channels[this.tv.selectedChannelId];
                content.innerHTML = `
                <div class="mdl-card  mdl-shadow--2dp">
                    <div class="mdl-card__title mdl-card--expand" 		
                        style="height: 176px; background: url('` + channel.logo + `') center / cover;">
                        <h2 class="mdl-card__title-text mdl-color--accent mdl-color-text--light-blue-600 mdl-shadow--2dp">` 
                        + channel.name + 
                        `</h2>
                    </div>
                    <div class="mdl-card__supporting-text">
                        ` + channel.description + `
                    </div>
                    <div class="mdl-card__actions mdl-card--border">
                        <a href="` + channel.site + `" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                            Go to site
                        </a>
                    </div>
                    <div class="mdl-card__menu">
                        <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                            <i class="material-icons">share</i>
                        </button>
                    </div>
                </div>
                `;
            },
        "placeChannels":
            function placeChannels() {
                var navigation = this.get("channels-list", 0);
                navigation.innerHTML = "";
                for (channel of this.tv.channels) {
                    navigation.innerHTML += 
                        `<a onclick="` + 
                        	`if (!` + this.tv.name + `.isPowerOn) { ` 
                        	+ this.tv.name + `.UI.showSnackbar('TV is turned off', 500); ` + 
                        	`} else {` 
                        	+ this.tv.name + `.selectedChannelId=` + (channel.id - 1) + `; ` 
                        	+ this.tv.name + `.UI.updateChannelInfo(); ` +
                        	`}" class="mdl-navigation__link">`
                        + channel.id + `. ` + channel.name + `</a>`
                }
            },
        "update":
            function update() {
                this.updatePower();
                this.updateVolume();
                this.updateVolumeLevel();
                this.updateChannelInfo();
                this.placeChannels();
            }
    };
};

// export
MasterTV.UI = {};
MasterTV.UI.createFor = createFor;

})(window.MasterTV || (window.MasterTV = {}));