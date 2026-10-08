import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { Roles } from 'src/guards/roles/roles.decorator';
import { Role } from 'src/guards/roles/roles.enum';
import { RoleGuard } from 'src/guards/roles/roles.guard';

@Controller('admin')
@UseGuards(AuthGuard, RoleGuard)
@Roles(Role.USER, Role.ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get("/data")
  getData() {
    return { message: "Admin data" };
  }
}
