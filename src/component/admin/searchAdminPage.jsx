import Search from "antd/es/input/Search"
import { useDispatch } from "react-redux"
import { isSearch, searchAdmin } from "../../redux/sreach/action"

const SearhAdminPage = () => {
    const dispath = useDispatch()
    const handelChange = (e) => {
        if (e) {
            dispath(searchAdmin(e))
            dispath(isSearch(true))
        }
        else {
            dispath(isSearch(false))
        }
    }
    return (
        <Search onChange={(e) => { handelChange(e.target.value) }} style={{ width: "50%" }} size="large"></Search>
    )
}
export default SearhAdminPage