((MasterTV) => {

function create(name, channels, selectedChannelId, volumeLevel, isVolumeOn, isPowerOn) {
    var tv = {
        "name": name,
        "channels": channels,
        "selectedChannelId": selectedChannelId,
        "volumeLevel": volumeLevel,
        "isVolumeOn": isVolumeOn,
        "isPowerOn": isPowerOn,
        "changeVolumeLevel": 
            function changeVolumeLevel(level) {
                this.volumeLevel = level;
                this.UI.showSnackbar("Volume is " + level, 500, null, "");
            },
        "UI": null,
        "volumeSwitch":
            function volumeSwitch() {
                this.isVolumeOn = !this.isVolumeOn;
                this.UI.updateVolume();
                this.UI.showSnackbar(isVolumeOn ? "volume is on" : "volume is off", 500, null, "");
            },
        "powerSwitch":
            function powerSwitch() {
                this.isPowerOn = !this.isPowerOn;
                this.UI.updatePower();
                if (this.isPowerOn == !this.isVolumeOn) this.volumeSwitch();
                this.UI.get("volumeSwitcher", 0).disabled = !this.isPowerOn;
                this.UI.updateChannelInfo();
                this.UI.showSnackbar(this.isPowerOn ? "TV is on" : "TV is off", 500, null, "");
            },
        "updateChannel":
            function updateChannel(i) {
                if (i == this.channels.length) return null;
                return MasterTV.Requests.makeWikiRequest(
                    this.channels[i].wikipediaTitle,
                    (xhr) => {
                        this.channels[i].description = MasterTV.Requests.extractHTMLfromWikiRequest(xhr);
                    },
                    (xhr) => window.console.log("status " + xhr.status)
                )
                .then(
                    () => this.updateChannel(i + 1)
                );
            },
        "updateChannelsDescription":
            function updateChannelsDescription() {
                this.UI.INIT();
                this.updateChannel(0).then(() => this.UI.update());
            }
       };
   tv.UI = MasterTV.UI.createFor(tv);
   setTimeout(() => { tv.UI.INIT(); tv.updateChannelsDescription(); }, 400);
   window[tv.name] = tv;
   return tv;
};

function createDefault(name) {
    var channels = [
        {
            id: 1,
            name: "Fox",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/FOX_wordmark.svg/1832px-FOX_wordmark.svg.png",
            wikipediaTitle: "Fox_(UK_and_Ireland)",
            site: "http://www.fox.com/"
        },
        {
            id: 2,
            name: "History channel",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/History_Logo.svg/512px-History_Logo.svg.png",
            wikipediaTitle: "History_(European_TV_channel)",
            site: "http://www.history.com/"
        },
        {
            id: 3,
            name: "CNN",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Cnn.svg/200px-Cnn.svg.png",
            wikipediaTitle: "CNN",
            site: "http://www.cnn.com/"
        },
        {
            id: 4,
            name: "Discovery",
            logo: "https://upload.wikimedia.org/wikipedia/ru/thumb/4/46/Discovery_Channel_International.svg/190px-Discovery_Channel_International.svg.png",
            wikipediaTitle: "Discovery_Channel_Russia",
            site: "http://www.discovery.com/"
        },
        {
            id: 5,
            name: "Animal Planet",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Animal_Planet_logo.svg/797px-Animal_Planet_logo.svg.png",
            wikipediaTitle: "Animal_Planet",
            site: "http://www.animal.discovery.com/"
        }
    ];
    return create(
            name,
            channels, 
            Number(window.location.hash.substring(1)) - 1,
            77,
            true,
            true 
        );
};

// export
MasterTV.TV = {};
MasterTV.TV.create = create;
MasterTV.TV.createDefault = createDefault;

})(window.MasterTV || (window.MasterTV = {}));