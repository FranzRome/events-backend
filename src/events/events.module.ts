import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { Event, EventsSchema } from './events.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventsSchema }]),
  ],
  providers: [EventsService],
  controllers: [EventsController],
})
export class EventsModule {}
