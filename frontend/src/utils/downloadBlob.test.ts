import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { downloadBlob } from './downloadBlob ';

describe('downloadBlob', () => {
  let createObjectURLMock: any;
  let revokeObjectURLMock: any;

  beforeEach(() => {
    createObjectURLMock = vi.fn(() => 'blob-url');
    revokeObjectURLMock = vi.fn();
    global.URL.createObjectURL = createObjectURLMock;
    global.URL.revokeObjectURL = revokeObjectURLMock;

    // document.createElement と click のモック
    const link = {
      href: '',
      download: '',
      click: vi.fn(),
    };
    vi.spyOn(document, 'createElement').mockReturnValue(link as any);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Blobからダウンロードリンクを作成し、クリックすること', () => {
    const blob = new Blob(['test content'], { type: 'text/plain' });
    const filename = 'test.txt';

    downloadBlob(blob, filename);

    expect(createObjectURLMock).toHaveBeenCalledWith(blob);
    expect(document.createElement).toHaveBeenCalledWith('a');
    
    const link = (document.createElement as any).mock.results[0].value;
    expect(link.href).toBe('blob-url');
    expect(link.download).toBe(filename);
    expect(link.click).toHaveBeenCalled();
    expect(revokeObjectURLMock).toHaveBeenCalledWith('blob-url');
  });
});

