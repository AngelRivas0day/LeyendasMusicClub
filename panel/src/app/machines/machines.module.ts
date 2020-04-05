import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MachinesRoutingModule } from './machines-routing.module';
import { UpdateImageComponent } from './components/update-image/update-image.component';
import { CreateMachineComponent } from './components/create-machine/create-machine.component';
import { EditMachineComponent } from './components/edit-machine/edit-machine.component';
import { MachinesComponent } from './components/machines/machines.component';


@NgModule({
  declarations: [UpdateImageComponent, CreateMachineComponent, EditMachineComponent, MachinesComponent],
  imports: [
    CommonModule,
    MachinesRoutingModule
  ]
})
export class MachinesModule { }
