// test

import { renderHook, waitFor } from '@testing-library/react';
import { useTimerMetric } from '../../src/hooks/useTimerMetric';
import { TimerMetric } from '../../src/utils/loadMetric';

describe('useTimerMetric', () => {
  it('should create and return an instance of TimerMetric', async () => {
    const { result } = renderHook(() => useTimerMetric());

    // Wait for useEffect to run
    await waitFor(() => {
      expect(result.current).not.toBeNull();
    });

    expect(result.current).toBeInstanceOf(TimerMetric);
  });

  it('should return the same instance on rerender', async () => {
    const { result, rerender } = renderHook(() => useTimerMetric());

    await waitFor(() => {
      expect(result.current).not.toBeNull();
    });

    const firstInstance = result.current;
    rerender();
    expect(result.current).toBe(firstInstance);
  });
});