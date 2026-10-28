import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from './schemas/employee.schema';
import { Model } from 'mongoose';
import { Profile } from './schemas/profile.schema';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private readonly employeeModel: Model<Employee>,
    @InjectModel(Profile.name) private readonly profileModel: Model<Profile>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const { profile, ...employeeData } = createEmployeeDto;

    const session = await this.employeeModel.db.startSession();
    session.startTransaction();

    try {
      const [createdProfile] = await this.profileModel.create([profile], {
        session,
      });
      const [createdEmployee] = await this.employeeModel.create(
        [{ ...employeeData, profile: createdProfile._id }],
        { session },
      );

      await session.commitTransaction();
      

      // Populates the profile reference on the document instance
    return await createdEmployee.populate('profile');
    
     
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }

  async findAll() {
    const employee = await this.employeeModel.find().populate('profile').lean();

    return employee;
  }

  async findOne(id: string) {
    return await this.employeeModel.findById(id).populate('profile').lean();
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const { profile, ...employeeData } = updateEmployeeDto;

    const employee = await this.findOne(id);
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    const session = await this.employeeModel.db.startSession();
    session.startTransaction();

    try {
      if (employee.profile?._id && profile) {
        await this.profileModel.findByIdAndUpdate(
          employee.profile._id,
          profile,
          { new: true, session },
        );
      }

      const updatedEmployee = await this.employeeModel.findByIdAndUpdate(
        id,
        { ...employeeData},
        { new: true, session },
      ).populate("profile")
      .lean();

      await session.commitTransaction();
      return updatedEmployee;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }

  remove(id: string) {
        return this.employeeModel.findByIdAndDelete(id).populate('profile').lean();
  }
}
