import React from "react";
import PropTypes from "prop-types";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { NavLink } from "react-router-dom";
import { PageHeader } from "antd";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import { Grid } from "@material-ui/core";
// @material-ui/icons
import ImageIcon from "@material-ui/icons/Image";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import RateReviewIcon from "@material-ui/icons/RateReview";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import DetailProduct from "./DetailProduct";
import ImageProduct from "./ImageProduct";
// assets
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
// data resource
import { server } from "variables/general.jsx";

const mdParser = new MarkdownIt({
  html: true
});

const plugins = [
  "header",
  "font-bold",
  "font-italic",
  "font-strikethrough",
  "list-unordered",
  "list-ordered",
  "block-quote",
  "block-wrap",
  "block-code-inline",
  "block-code-block",
  "table",
  "image",
  "link",
  "clear",
  "logger"
];

const path = "/catalog";

const PostTitle = ({ record }) => {
  return <span>Post {record ? `"${record.title}"` : ""}</span>;
};

PostTitle.propTypes = {
  record: PropTypes.object
};

class Dashboard extends React.Component {
  state = {
    value: 0,
    editorValue: "",
    htmlEditor: ""
  };

  componentDidUpdate(): void {
    const editor = document.querySelector(".js-editor");
    if (editor) {
      editor.innerHTML = this.state.htmlEditor;
    }
  }

  mdEditor = React.createRef();

  handleEditorChange = ({ text }) => {
    this.setState({
      editorValue: text,
      htmlEditor: this.mdEditor.current.getHtmlValue()
    });
  };

  render() {
    return (
      <div>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <GridItem xs={12}>
            <NavLink to={path}>
              <PageHeader
                onBack={() => null}
                title="Каталог"
              />

            </NavLink>
          </GridItem>
          <GridItem xs={12}>
            <CustomTabs
              title=""
              headerColor="info"
              history={this.props.history}
              tabs={[
                {
                  tabName: "Детали",
                  tabIcon: SettingsApplicationsIcon,
                  tabContent: (
                    <DetailProduct>
                      {this.state.htmlEditor
                        ? <div className="js-editor"/>
                        : null
                      }
                      <MdEditor
                        ref={this.mdEditor}
                        value={this.state.editorValue}
                        style={{ height: "300px" }}
                        plugins={plugins}
                        renderHTML={(text) => mdParser.render(text)}
                        placeholder={"Опишите детально..."}
                        onChange={this.handleEditorChange}
                        config={{
                          theme: "primary",
                          view: {
                            menu: true,
                            md: true,
                            html: false
                          },
                          canView: {
                            menu: false,
                            md: false,
                            html: true,
                            hideMenu: false
                          }
                        }}
                      />
                    </DetailProduct>
                  )
                },
                {
                  tabName: "Изображение",
                  tabIcon: ImageIcon,
                  tabContent: (
                    <ImageProduct/>
                  )
                },

                {
                  tabName: "Продвижение",
                  tabIcon: TrendingUpIcon,
                  tabContent: (
                    <h1>Продвижение</h1>
                  )
                },
                {
                  tabName: "Отзывы",
                  tabIcon: RateReviewIcon,
                  tabContent: (
                    <p>{server.join("")}</p>
                  )
                }
              ]}
            />
          </GridItem>
        </Grid>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object
};

export default withStyles(dashboardStyle)(Dashboard);
