import { HistoryService } from '@/features/history/service/historyService';
import { BaseController } from '@/base/controllers/baseController';
import type { HistoryResponse, HistorySummary, AggregationData } from '@shared/models/history';

export class HistoryController extends BaseController {
  constructor(private readonly historyService: HistoryService) {
    super();
  }

  // 履歴検索
  searchHistories = this.asyncHandler<HistorySummary[]>(async (req, res) => {
    const histories = await this.historyService.searchHistories(req.body);
    return this.ok(res, histories);
  });

  // 開始時間による検索 (Query Parameter)
  searchByStartTimeHistories = this.asyncHandler<AggregationData>(async (req, res) => {
    const query = new Date(req.query.datetime as string);
    const histories = await this.historyService.searchByStartTimeHistories(query);
    return this.ok(res, histories);
  });

  // 1件取得
  getHistory = this.asyncHandler<HistoryResponse>(async (req, res) => {
    const { id } = req.params;
    const history = await this.historyService.getHistory(id);
    return this.ok(res, history);
  });

  // 作成
  createHistory = this.asyncHandler<HistoryResponse[]>(async (req, res) => {
    const history = await this.historyService.createHistory(req.body);
    return this.created(res, history);
  });

  // 更新
  updateHistory = this.asyncHandler<null>(async (req, res) => {
    const { id } = req.params;
    await this.historyService.updateHistory(req.body, id);
    return this.updated(res, null);
  });

  // 削除
  deleteHistory = this.asyncHandler<void>(async (req, res) => {
    const { id } = req.params;
    await this.historyService.deleteHistory(id);
    return this.deleted(res);
  });
}
