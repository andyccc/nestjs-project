import { Repository, SelectQueryBuilder } from "typeorm";
import { MyPageDto, PageData } from "../page/page.dto";

export class BaseService<T> {

    async findListByPage(pageDto: MyPageDto, repository: Repository<T>, queryFn: (query) => (SelectQueryBuilder<T>)) {

        let limit = Math.min(Math.max(0, pageDto.limit), 100);
        let page = pageDto.page || 1;

        let query = repository
            .createQueryBuilder()
            .skip((page - 1) * limit)
            .take(limit);

        query = queryFn ? queryFn(query) : query;

        let queryResult = await query.getManyAndCount();
        let list = queryResult[0] as [] || [];
        let totalRows = queryResult[1];
        let totalPage = Math.ceil(totalRows / limit);

        let result = {} as PageData;
        result.list = list;
        result.page = page;
        result.limit = limit;
        result.totalRows = totalRows;
        result.totalPage = totalPage;

        return result;
    }

}