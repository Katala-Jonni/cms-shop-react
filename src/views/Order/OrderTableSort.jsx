import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import { Space, Table } from "antd";
// core components
import SearchInput from "components/Search/SearchInput";

class OrderTableSort extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null
  };

  handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  };

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null
    });
  };

  setAgeSort = () => {
    this.setState({
      sortedInfo: {
        order: "descend",
        columnKey: "age"
      }
    });
  };

  render() {
    let { sortedInfo, filteredInfo } = this.state;
    const { viewSearch, onChangeSearch } = this.props;

    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = this.props.getColumns(filteredInfo, sortedInfo);
    return (
      <>
        {viewSearch
          ? <Space style={{ marginBottom: 16 }}>
            <SearchInput onChange={onChangeSearch} disabledBtn/>
          </Space>
          : null
        }
        <Table
          columns={columns}
          dataSource={this.props.orders}
          onChange={this.handleChange}
          scroll={this.props.scroll}
          tableLayout={this.props.tableLayout}
          bordered={this.props.bordered}
          footer={this.props.footer ? this.props.footer : null}
          loading={false}
          pagination={this.props.pagination}
          size={"default"}
          expandable
          title={undefined}
          showHeader
          hasData
          bottom={"bottomRight"}
          showSorterTooltip={false}
          onRow={(record) => {
            return {
              onClick: () => {
                const path = `${this.props.path}/${record.id}`;
                this.props.history.push(path);
              } // click row
            };
          }}
        />
      </>
    );
  }
}

OrderTableSort.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  orders: PropTypes.array,
  getColumns: PropTypes.func,
  path: PropTypes.string,
  bordered: PropTypes.bool,
  footer: PropTypes.any,
  tableLayout: PropTypes.string,
  scroll: PropTypes.object,
  pagination: PropTypes.bool,
  viewSearch: PropTypes.bool,
  onChangeSearch: PropTypes.func
};

export default OrderTableSort;
