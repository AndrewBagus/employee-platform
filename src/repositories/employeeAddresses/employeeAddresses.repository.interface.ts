import type { EMployeeAddressResponseDto, CreateEMployeeAddressDto, UpdateEMployeeAddressDto } from "@dtos/employeeAddress.dto";

export interface EmployeeAddressRepositoryInterface {
  findAll(): Promise<EMployeeAddressResponseDto[]>;
  findById(id: string): Promise<EMployeeAddressResponseDto | null>;
  create(data: CreateEMployeeAddressDto): Promise<EMployeeAddressResponseDto>;
  update(id: string, data: UpdateEMployeeAddressDto): Promise<EMployeeAddressResponseDto | null>;
  softDelete(id: string): Promise<void>;
}
