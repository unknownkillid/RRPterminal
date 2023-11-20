const inputEl = document.getElementById('input');
const outputEl = document.getElementById('output');

let offset = window.pageYOffset;

function scrollToBottom() {
    window.scrollBy(0, document.body.scrollHeight);
  }
  

inputEl.focus();
inputEl.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        scrollToBottom();
        const command = inputEl.value;
        handleCommand(command);
        inputEl.value = '';
    }
});

let currentRoom = 'start';
let hackProgress = 0;
let progressBar = "-------------------------- Completed -------------------------";
let timeout = 3000;

const rooms = {
    start: {
        description: `commands: <br>"help" <br><br>"sudo su - სისტემის ადმინისტრატორი"
        <br> "porthack -w file/wordlist.txt - პორტების დაჰაკვა"
        <br> "ssh22 config.py ssh პროტოკილოს მოხსნა"
        <br> "schmod 777 deleteLog.py ლოგების წაშლა"`,
        exits: { north: 'help' },
    },
};

function handleCommand(command) {
    let output = '';

    switch (command) {
        case 'help':
            output = rooms[currentRoom].description;
            break;

        case 'sudo su':
            output = `Now you are root let's start what you wanna do.`;

            hackProgress = 1;
            break;

        case 'porthack -w file/wordlist.txt':

            output = `<br> eth0  Link encap:Ethernet  HWaddr 00:0B:CD:1C:18:5A
            inet addr:172.16.25.126  Bcast:172.16.25.63  Mask:255.255.255.224
            inet6 addr: fe80::20b:cdff:fe1c:185a/64 Scope:Link
            UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
            RX packets:2341604 errors:0 dropped:0 overruns:0 frame:0
            TX packets:2217673 errors:0 dropped:0 overruns:0 carrier:0
            collisions:0 txqueuelen:1000
            RX bytes:293460932 (279.8 MiB)  TX bytes:1042006549 (993.7 MiB)
            Interrupt:185 Memory:f7fe0000-f7ff0000
            <br> <br>
            lo      Link encap:Local Loopback
            inet addr:127.0.0.1  Mask:255.0.0.0
            inet6 addr: ::1/128 Scope:Host
            UP LOOPBACK RUNNING  MTU:16436  Metric:1
            RX packets:5019066 errors:0 dropped:0 overruns:0 frame:0
            TX packets:5019066 errors:0 dropped:0 overruns:0 carrier:0
            collisions:0 txqueuelen:0
            RX bytes:2174522634 (2.0 GiB)  TX bytes:2174522634 (2.0 GiB)
          <br><br>
          tun0      Link encap:UNSPEC  HWaddr 00-00-00-00-00-00-00-00-00-00-00-00-00-00-00-00
            inet addr:10.1.1.1  P-t-P:10.1.1.2  Mask:255.255.255.255
            UP POINTOPOINT RUNNING NOARP MULTICAST  MTU:1500  Metric:1
            RX packets:0 errors:0 dropped:0 overruns:0 frame:0
            TX packets:0 errors:0 dropped:0 overruns:0 carrier:0
            collisions:0 txqueuelen:100
            RX bytes:0 (0.0 b)  TX bytes:0 (0.0 b) <br> <br>` + progressBar
            
           

            if (hackProgress === 1) {
                hackProgress = 2;
            } else if (hackProgress === 2) {
                output = 'all ports hacked!'
            } else {
                output = "you are not admin"
            }
            break;

        case 'ssh22 config.py':
            output = `ssh.service - OpenBSD Secure Shell server
            <br>Loaded: loaded (/lib/systemd/system/ssh.service; enabled; vendor preset: enabled)
            <br>Active: active (running) since Thu 2020-05-14 15:08:23 CEST; 24h ago
            <br>Main PID: 846 (sshd)
            <br>Tasks: 1 (limit: 4681)
            <br>CGroup: /system.slice/ssh.service
                    <br>└─846 /usr/sbin/sshd -D
         <br>
         <br>Mai 14 15:08:22 inlane systemd[1]: Starting OpenBSD Secure Shell server...
        <br> Mai 14 15:08:23 inlane sshd[846]: Server listening on 0.0.0.0 port 22.
         <br>Mai 14 15:08:23 inlane sshd[846]: Server listening on :: port 22.
         <br>Mai 14 15:08:23 inlane systemd[1]: Started OpenBSD Secure Shell server.
        <br> Mai 14 15:08:30 inlane systemd[1]: Reloading OpenBSD Secure Shell server.
         <br>Mai 14 15:08:31 inlane sshd[846]: Received SIGHUP; restarting.
         <br>Mai 14 15:08:31 inlane sshd[846]: Server listening on 0.0.0.0 port 22.
         <br>Mai 14 15:08:31 inlane sshd[846]: Server listening on :: port 22.`;


            if (hackProgress === 2) {
                hackProgress = 3
            } else if (hackProgress === 3) {
                output = 'ssh protocol succesfully down!'
            } else {
                output = "ssh protocol not found!"
            }
            break;

        case 'go west':
            if (rooms[currentRoom].exits.west) {
                currentRoom = rooms[currentRoom].exits.west;
                output = rooms[currentRoom].description;
            } else {
                output = "You can't go that way.";
            }
            break;

        default:
            output = 'Unknown command: ' + command;
    }

    outputEl.innerHTML += `<div class="prompt">$></div><div>${command}</div><div>${output}</div>`;
}

// Initial description
outputEl.innerHTML += `<div class="prompt">იმისთვის რომ მოიპოვოთ წვდომა კარებებზე ამისთვის უნდა გატეხოთ სისტემა.</div><div></div><div>${rooms[currentRoom].description}</div>`;