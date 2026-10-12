import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentDto, UpdateStudentDto } from './dto/student.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from './schemas/student.schema';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private readonly studentModel: Model<Student>,
  ) {}

  // ── CREATE ─────────────────────────────────────────────────────
  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    return await this.studentModel.create(createStudentDto);
  }

  // ── READ (all) ─────────────────────────────────────────────────
  async findAll(): Promise<Student[]> {
    return await this.studentModel.find().exec();
  }

  // ── READ (one) ─────────────────────────────────────────────────
  async findOne(id: string): Promise<Student> {
    const student = await this.studentModel.findById(id).exec();
    if (!student) {
      throw new NotFoundException(`Student with ID "${id} not found`);
    }
    return student;
  }

  // ── UPDATE ─────────────────────────────────────────────────────
  async update(
    id: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    const updatedStudent = await this.studentModel
      .findByIdAndUpdate(id, updateStudentDto, {
        returnDocument: "after",
        runValidators: true,
      })
      .exec();

    if (!updatedStudent) {
      throw new NotFoundException(`Student with ID "${id}" not found`);
    }
    return updatedStudent;
  }

  // ── DELETE ─────────────────────────────────────────────────────
  async remove(id: string): Promise<Student> {
    const deletedStudent = await this.studentModel
      .findByIdAndDelete(id)
      .exec();

    if (!deletedStudent) {
      throw new NotFoundException(`Student with ID "${id}" not found`);
    }
    return deletedStudent;
  }
}
