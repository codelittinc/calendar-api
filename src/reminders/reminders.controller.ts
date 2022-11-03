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
    schema: {
      example: {
        title: 'Title Example',
        description: 'Description example',
        date: '2022-11-03T15:14:21.005Z',
        color: '#FFFFFF',
        token: {
          id: '21681ba4-7556-4358-9500-e4afe1ce6141',
          name: 'John Doe',
          createdAt: '2022-11-02T15:12:13.242Z',
          updatedAt: '2022-11-02T15:12:13.242Z',
        },
        id: '0493ad93-1290-41ea-818e-c7a371c828df',
        createdAt: '2022-11-03T15:14:36.265Z',
        updatedAt: '2022-11-03T15:14:36.265Z',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @Post()
  async create(@Body() createReminderDto: CreateReminderDto) {
    return await this.remindersService.create(createReminderDto);
  }

  @ApiOperation({ summary: 'Get the days that have created reminders' })
  @ApiResponse({
    status: 200,
    description: 'Returns an array with the days that have created reminders',
    schema: {
      example: [
        {
          date: '2022-11-02T00:00:00.000Z',
        },
        {
          date: '2022-11-03T00:00:00.000Z',
        },
      ],
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiParam({ name: 'token', description: 'A valid token ID to authenticate' })
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
    schema: {
      example: [
        {
          id: '0493ad93-1290-41ea-818e-c7a371c828df',
          title: 'Title Example',
          description: 'Description example',
          date: '2022-11-03T15:14:21.005Z',
          color: '#FFFFFF',
          createdAt: '2022-11-03T15:14:36.265Z',
          updatedAt: '2022-11-03T15:14:36.265Z',
        },
        {
          id: 'f2c1f472-0743-450c-a928-71810066d7ba',
          title: 'Title Example',
          description: 'Description example',
          date: '2022-11-03T15:17:13.222Z',
          color: '#FFFFFF',
          createdAt: '2022-11-03T15:17:38.778Z',
          updatedAt: '2022-11-03T15:17:38.778Z',
        },
      ],
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiParam({ name: 'token', description: 'A valid token ID to authenticate' })
  @Get(':token/by-day')
  async findRemindersByDay(@Param('token') token: string, @Query() getremindersByDayDto: GetRemindersByDayDto) {
    return await this.remindersService.findRemindersByDay(token, getremindersByDayDto);
  }

  @ApiOperation({ summary: 'Get a single reminder' })
  @ApiResponse({
    status: 200,
    description: 'Returns a single reminder',
    schema: {
      example: {
        id: '417b9cb6-6953-4cb5-b42e-6b6c8b209fe5',
        title: 'Title Example',
        description: 'Description example',
        date: '2022-11-02T20:11:45.639Z',
        color: '#FFFFFF',
        createdAt: '2022-11-02T19:29:25.186Z',
        updatedAt: '2022-11-02T20:12:26.845Z',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiParam({ name: 'token', description: 'A valid token ID to authenticate' })
  @ApiParam({ name: 'id', description: 'A valid ID of a reminder to get' })
  @Get(':token/:id')
  async findOne(@Param('token') token: string, @Param('id') id: string) {
    return await this.remindersService.findOne(token, id);
  }

  @ApiOperation({ summary: 'Update the data of a reminder' })
  @ApiResponse({
    status: 200,
    description: 'The reminder has been updated successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiParam({ name: 'token', description: 'A valid token ID to authenticate' })
  @ApiParam({ name: 'id', description: 'A valid ID of a reminder to update' })
  @Patch(':token/:id')
  async update(@Param('token') token: string, @Param('id') id: string, @Body() updateReminderDto: UpdateReminderDto) {
    return await this.remindersService.update(token, id, updateReminderDto);
  }

  @ApiOperation({ summary: 'Delete a reminder' })
  @ApiResponse({
    status: 200,
    description: 'The reminder has been deleted successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiParam({ name: 'token', description: 'A valid token ID to authenticate' })
  @ApiParam({ name: 'id', description: 'A valid ID of a reminder to delete' })
  @Delete(':token/:id')
  async remove(@Param('token') token: string, @Param('id') id: string) {
    return await this.remindersService.remove(token, id);
  }
}
