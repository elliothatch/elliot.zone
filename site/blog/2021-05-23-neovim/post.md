I use Neovim everyday, for code editing, note taking, and even as my pager! Neovim is a very powerful text editor, but it can be a challenge to start using due to its impenetrable interface. Many out-of-the-box features can also feel lacking in vanilla Neovim, such as code completion, code linting, and project navigation.

This guide includes an overview of my workflow in Neovim, and my configurations and keybindings for all the features I consider essential in a text editor or IDE.
I'll go over the set of commands I regularly use to navigate and edit code, some of which can be hard to discover on your own.
I'll also showcase some of my favorite plugins, that provide the rich programming language support you would expect from an IDE.

I should add that [built-in LSP support](https://github.com/neovim/neovim/pull/10222) and [tree-sitter support](https://github.com/tree-sitter/tree-sitter/pull/444) are already implemented in nightly builds and will be included in Neovim's next major release, which may remove the need for some plugins.

# Resources
Many excellent tutorials for vim already exist, and I encourage you to check them out.
- [Vim Casts](http://vimcasts.org/)
- [Learn Vim For the Last Time: A Tutorial and Primer](https://danielmiessler.com/study/vim/)

# Reading this document
Terms styled like <span class="help-keyword">this</span> are keywords that you can search for in Neovim's built-in documentation, using the <span class="ex-command">:help {keyword}</span> command.

Some useful keywords:
- <span class="help-keyword">nvim</span>
- <span class="help-keyword">edit-files</span>
- <span class="help-keyword">buffers</span>
- <span class="help-keyword">help navigation ??</span>

Ex-commands are styled like<span class="ex-command">:this</span> and can be entered into the Neovim command line. You can search any of these commands in Neovim's help for more information.

# init.vim
Neovim is configured with vimscript in the config file <span class="help-keyword">init.vim</span>, located at:

> Unix		~/.config/nvim/init.vim
> Windows		~/AppData/Local/nvim/init.vim
> Or if |$XDG_CONFIG_HOME| is defined:
> 	$XDG_CONFIG_HOME/nvim/init.vim

Usually I open neovim and edit the init.vim with <span class="ex-command">:e $MYVIMRC</span>.

As you read this guide you can edit your init.vim, then reload it with the command <span class="ex-command">:source $MYVIMRC</span>.

You can also run any vimscript command by entering it as a command with the colon `:` key.

# Quick-save

```vimscript
nnoremap <leader>w :w<cr>
```

This command creates a keybinding to save the current file. When you press the key sequence `<leader>w`, Neovim just types in the command <span class="ex-command">:w</span>, then hits the return key (`<cr>`)  to execute it.

<div class="alert alert-tip">
<span class="ex-command">:w</span> is shorthand for <span class="ex-command">:write</span>, which writes the current buffer to disk.
</div>

But what is <span class="help-keyword">\<leader\></span>?  

The "mapleader" is just a placeholder for any key you choose to set. I prefix most of my custom keybindings with `<leader>` to give me an "empty slate" where I can add bindings without accidentally overwriting Neovim's built-in bindings.

The default leader is backslash `\`, I have mine bound to the space bar.

You can place this at the beginning of your <span class="help-keyword">init.vim</span> to bind space to the mapleader.

```vimscript
map <space> <leader>
```

The command we're using to create the quick-save keybinding is <span class="help-keyword">nnoremap</span>, which means "normal non-recursive map".  
"Normal" tells us which of the <span class="help-keyword">map-modes</span> the mapping applies to.
In Neovim's modal interface the meaning of every key on the keyboard depends on which mode you're in. Neovim starts in <span class="help-keyword">Normal-mode</span>. Most editor commands you use are issued from normal mode, and you can always return to normal mode by hitting the escape key `<ESC>`.

Almost all custom bindings we write will be for <span class="help-keyword">Normal-mode</span> and <span class="help-keyword">Visual-mode</span>. It's generally not useful to rebind keys in <span class="help-keyword">Insert-mode</span> because then you won't be able to type those characters into your document!

"Non-recursive" prevents the binding from being invoked by itself. Generally, that's not you want to happen, so almost all custom bindings we make will be with the "nore" variants.

The help page for <span class="help-keyword">map-modes</span> lists all the various map and unmap commands. It also helpfully notes:

> :nunmap can also be used outside of a monastery.

## Why map :w?
It might seem unnecessary to remap <span class="help-keyword">:w</span>, after all it only saves one keystroke!
The reasoning goes back to my idea of an "empty slate" for bindings.

Neovim is full of unintuitive commands that can be overwhelming to memorize. It's much easier to remember a small set of bindings that you added yourself. When I find myself repeatedly forgetting how to run a command, I'll make a new binding that's easier to remember.

# Buffers, Windows, and Tabs
When I work I almost always have multiple buffers open at once. I use these keybindings to quickly switch between them:

```vimscript
nnoremap <leader>l :bnext<cr>
nnoremap <leader>h :bprevious<cr>
nnoremap <leader>n :enew<cr>
nnoremap <expr> <leader>q len(getbufinfo({'buflisted':1})) == 1 ? ':enew<cr>:bd#<cr>' : (buflisted(bufnr('#')) ? ':b #<cr>:bd #<cr>' : ':bp<cr>:bd #<cr>')
```

Since I use <span class="help-keyword">hjkl</span> for navigation, this is like binding "previous buffer" to Space + Left and "next buffer" to Space + Right

I use `<space>n` to create a new buffer, and `<space>q` to close the current buffer.

What's going on in that last binding meant to close the buffer? Normally, when you close a buffer in a split window with <span class="ex-command">:bd</span>, it closes the split as well. I often work with two vertically split windows, and prefer that when I close a buffer it switches to the last buffer I was looking at, rather than closing the window.

This binding switches to the previous buffer with <span class="ex-command">:b #</span>, then closes the original (now previous) buffer with <span class="ex-command">:bd #</span>. We're using <span class="help-keyword"><expr></span> to create a <span class="help-keyword">map-expression</span>, which lets us execute vimscript to determine what command to run. We're just using the expression to fix some edge cases when there is no previous buffer to switch to.





Neovim's <span class="help-keyword">buffers</span> page explains succinctly:

> A buffer is the in-memory text of a file.
> A window is a viewport on a buffer.
> A tab page is a collection of windows.

When we run `nvim a.txt b.txt c.txt` Neovim reads the contents of each file into its own in-memory buffer and displays the first buffer in the window.

We can switch to the next buffer by typing <span class="ex-command">:bnext</span> and the previous buffer by typing <span class="ex-command">:bprevious</span>.

We can also list all buffers with <span class="ex-command">:buffers</span> and jump to a buffer with <span class="ex-command">:buffer</span> by providing a buffer number (<span class="ex-command">:buffer 2</span>), or a name of a file <span class="ex-command">:buffer c.txt</span>.
<div class="alert alert-tip">
When selecting by name, Neovim accepts the shortest unique partial name, so only need to type <span class="ex-command">:buffer c</span> to open `c.txt`. There are shorthands for ex-commands too, so you can type <span class="ex-command">:b c</span> to switch to `c.txt`.
</div>

Even with shorthands, this is tedious.










# Intro to Neovim
Start here if you have never used Neovim or Vim before.

## Launching Neovim
Launch neovim by running the `nvim` command. You can open one or more files by passing them as arguments:

```bash
nvim a.txt b.txt c.txt
```

If the file exists on your filesystem it will be opened in a buffer, if the file doesn't exist neovim creates an empty buffer and sets its <span class="help-keyword">current-file</span>.

If you run the above command to open 3 files, you will only see the first file, `a.txt`! While `b.txt` and `c.txt` have been opened in their own buffers, they are hidden from our view.

# Navigation
Neovim comes with an interactive tutorial to teach you basic navigation and commands. You can start it by typing <span class="ex-command">:Tutor</span>. I'm not going to cover basic navigation, but later in this article I discuss my most often used commands.

If you're ever lost in neovim, you can always press `Escape` to return to "Normal mode", then type <span class="ex-command">:help</span> to show the built-in help. This page shows you how to close vim and how to move around.

## Buffers, Windows, and Tabs
Neovim's <span class="help-keyword">buffers</span> page explains succinctly:

> A buffer is the in-memory text of a file.
> A window is a viewport on a buffer.
> A tab page is a collection of windows.

When we run `nvim a.txt b.txt c.txt` Neovim reads the contents of each file into its own in-memory buffer and displays the first buffer in the window.

We can switch to the next buffer by typing <span class="ex-command">:bnext</span> and the previous buffer by typing <span class="ex-command">:bprevious</span>.

We can also list all buffers with <span class="ex-command">:buffers</span> and jump to a buffer with <span class="ex-command">:buffer</span> by providing a buffer number (<span class="ex-command">:buffer 2</span>), or a name of a file <span class="ex-command">:buffer c.txt</span>.
<div class="alert alert-tip">
When selecting by name, Neovim accepts the shortest unique partial name, so only need to type <span class="ex-command">:buffer c</span> to open `c.txt`. There are shorthands for ex-commands too, so you can type <span class="ex-command">:b c</span> to switch to `c.txt`.
</div>

Even with shorthands, this is starting to get tedious.


# Configuration
vim.init

## Plugins
vim-plug


### fzf.vim
### coc.vim

