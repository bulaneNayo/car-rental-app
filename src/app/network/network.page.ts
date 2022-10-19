import { Component, OnInit } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';
@Component({
  selector: 'app-network',
  templateUrl: './network.page.html',
  styleUrls: ['./network.page.scss'],
})
export class NetworkPage implements OnInit {

  constructor( public network: Network, public dialog: Dialogs) {
    this.network.onDisconnect().subscribe(() => {
      this.dialog.alert('Network was disconnected: -()');
    });
    this.network.onConnect().subscribe(() => {
      setTimeout(() => {
      this.dialog.alert('We got a '+this.network.type  +'connection!');
      });

    });
  }


  ngOnInit() {
  }

}
