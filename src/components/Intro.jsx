import { Form } from "react-router-dom"

//librray
import { UserPlusIcon } from "@heroicons/react/24/solid"

//assets
import illustration from "../assets/illustration.jpeg"

const Intro = () => {
    return (
        <div className ="intro">
            <div>
                <h1>
                    Take Control of<span className="accent"> Your Money</span>
                </h1>
                <p style={{fontWeight: 'bold' , fontFamily: 'sans-serif'}}>
                Financial peace of mind starts with a well-planned budget.
                Start your journey today.
                </p>
                <Form method="post">
                    <input 
                    type="text" 
                    name="userName" 
                    required 
                    placeholder="What is your name?"
                    aria-label="Your Name" autoComplete="given-name" 
                    />

                    <input type="hidden" name="_action" 
                    value="newUser" />

                    <button type="submit"  className="btn
                    btn--dark">
                        <span>Create Account</span>
                        <UserPlusIcon width = {20} />
                    </button>
                </Form>
            </div>

            <img src = {illustration} alt="Person with Money"
            width={400} />
            
        </div>
    )
}

export default Intro