import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetNotificationsByMonthDto } from './dto/get-notifications-month.dto';
import { GetRemindersByDayDto } from './dto/get-reminders-day.dto';

@ApiTags('Reminders')
@Controller('reminders')
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

  @Post()
  async create(@Body() createReminderDto: CreateReminderDto) {
    return await this.remindersService.create(createReminderDto);
  }

  @Get(':token')
  async findRemindersNotificationsByMonth(
    @Param('token') token: string,
    @Query() getNotificationsByMonthDto: GetNotificationsByMonthDto,
  ) {
    return await this.remindersService.findRemindersNotificationsByMonth(token, getNotificationsByMonthDto);
  }

  @Get(':token/:id')
  async findOne(@Param('token') token: string, @Param('id') id: string) {
    return await this.remindersService.findOne(token, id);
  }

  @Get(':token/by-day')
  async findRemindersByDay(@Param('token') token: string, @Query() getremindersByDayDto: GetRemindersByDayDto) {
    return await this.remindersService.findRemindersByDay(token, getremindersByDayDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateReminderDto: UpdateReminderDto) {
    return await this.remindersService.update(id, updateReminderDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.remindersService.remove(id);
  }
}
