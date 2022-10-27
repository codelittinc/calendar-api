import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetNotificationsByMonthDto } from './dto/get-notifications-month.dto';
import { GetRemindersByDayDto } from './dto/get-reminders-day.dto';

@ApiTags('Reminders')
@Controller('reminders')
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

  @ApiOperation({ summary: 'Create a reminder' })
  @ApiResponse({
    status: 201,
    description: 'The reminder has been successfully created',
  })
  @ApiResponse({
    status: 400,
    description: 'An error has occurred when trying to create a reminder',
  })
  @Post()
  async create(@Body() createReminderDto: CreateReminderDto) {
    return await this.remindersService.create(createReminderDto);
  }

  @ApiOperation({ summary: 'Get the days that have created reminders' })
  @ApiResponse({
    status: 200,
    description: 'Returns an array with the days that have created reminders',
  })
  @ApiParam({ name: 'token', description: 'A valid token ID to authenticate', type: 'uuid' })
  @Get(':token')
  async findRemindersNotificationsByMonth(
    @Param('token') token: string,
    @Query() getNotificationsByMonthDto: GetNotificationsByMonthDto,
  ) {
    return await this.remindersService.findRemindersNotificationsByMonth(token, getNotificationsByMonthDto);
  }

  @ApiOperation({ summary: 'Get a list of reminders by day' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of reminders for the selected date',
  })
  @ApiParam({ name: 'token', description: 'A valid token ID to authenticate', type: 'uuid' })
  @Get(':token/by-day')
  async findRemindersByDay(@Param('token') token: string, @Query() getremindersByDayDto: GetRemindersByDayDto) {
    return await this.remindersService.findRemindersByDay(token, getremindersByDayDto);
  }

  @ApiOperation({ summary: 'Get a single reminder' })
  @ApiResponse({
    status: 200,
    description: 'Returns a single reminder',
  })
  @ApiParam({ name: 'token', description: 'A valid token ID to authenticate', type: 'uuid' })
  @ApiParam({ name: 'id', description: 'A valid ID of a reminder to get', type: 'uuid' })
  @Get(':token/:id')
  async findOne(@Param('token') token: string, @Param('id') id: string) {
    return await this.remindersService.findOne(token, id);
  }

  @ApiOperation({ summary: 'Update the data of a reminder' })
  @ApiResponse({
    status: 200,
    description: 'The reminder has been updated successfully',
  })
  @ApiParam({ name: 'id', description: 'A valid ID of a reminder to update', type: 'uuid' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateReminderDto: UpdateReminderDto) {
    return await this.remindersService.update(id, updateReminderDto);
  }

  @ApiOperation({ summary: 'Delete a reminder' })
  @ApiResponse({
    status: 200,
    description: 'The reminder has been deleted successfully',
  })
  @ApiParam({ name: 'id', description: 'A valid ID of a reminder to delete', type: 'uuid' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.remindersService.remove(id);
  }
}
