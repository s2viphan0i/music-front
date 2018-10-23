myApp.service("playerService", [function () {
    this.IsPaused = false;
    this.CurrentTrack = null;
    this.Data = null;
    this.CurrentTime = 0;
	
    this.Play = function (track) {
        this.Data = track;
        this.IsPaused = false;
    };
    this.Stop = function (){
        this.IsPaused = false;
    }
    this.Pause = function () {
        this.IsPaused = !this.IsPaused;
    };
}]);