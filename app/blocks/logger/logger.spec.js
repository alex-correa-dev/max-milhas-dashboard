describe('Unit tests for loggers', () => {
  let $log;
  let logger;
  
  beforeEach(module('blocks.logger'));
  
  beforeEach(
    inject((_$log_, _logger_) => {
      $log = _$log_;
      logger = _logger_;
    })
  );
  
  it('Error log', (done) => {
    const status = 500;
    const err = { message: 'timeout' };
    logger.error(status, err);
    assert.strictEqual(JSON.stringify($log.error.logs[0]), JSON.stringify([`Error: ${status}`, err]));
    done();
  });
  
  it('Info log', (done) => {
    const status = 404;
    const data = { message: 'No data found.' };
    logger.info(status, data);
    assert.strictEqual(JSON.stringify($log.info.logs[0]), JSON.stringify([`Info: ${status}`, data]));
    done();
  });
  
  it('Success log', (done) => {
    const status = 200;
    const data = { message: 'Data found.' };
    logger.success(status, data);
    assert.strictEqual(JSON.stringify($log.info.logs[0]), JSON.stringify([`Success ${status}`, data]));
    done();
  });
  
  it('Warning log', (done) => {
    const status = 304;
    const data = { message: 'Prohibited.' };
    logger.warning(status, data);
    assert.strictEqual(JSON.stringify($log.warn.logs[0]), JSON.stringify([`Warning: ${status}`, data]));
    done();
  });
});
