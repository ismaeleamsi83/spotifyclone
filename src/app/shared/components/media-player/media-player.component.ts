import { Component, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit {

  mockCover: TrackModel = {
    cover: 'data:image/jpeg;base64,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',
    album: 'Gioli & Assia',
    name: 'BEBE (Oficial)',
    url: 'http://localhost/track.mp3',
    _id: 1

  }

  constructor() { }

  ngOnInit(): void {
  }

}
