import { describe, test, expect, mock } from "bun:test";
import { CompanyService } from "../../../../src/services/company/company.service";
import type { CompanyServiceInterface } from "../../../../src/services/company/company.service.interface";
import type { CompanyRepositoryInterface } from "../../../../src/repositories/company/company.repository.interface";
import type { CompanyResponseDto } from "../../../../src/dtos/company.dto";

describe("CompanyService", () => {
  test("findAll delegates to repository and returns result", async () => {
    const mockRepository: CompanyRepositoryInterface = {
      findAll: mock(() => Promise.resolve<CompanyResponseDto[]>([])),
    };
    const service = new CompanyService(mockRepository);
    const result = await service.findAll();

    expect(result).toEqual([]);
    expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
  });
});
